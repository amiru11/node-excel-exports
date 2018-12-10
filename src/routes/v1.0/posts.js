import models from '../../models'
import { asyncMiddleware } from '../../lib/middlewares'
import excel from 'node-excel-export'

import config from '../../../config'

export const get = asyncMiddleware(async (req, res, next) => {
  const page = req.page
  const pageSize = req.pageSize

  try {
    const result = await models.Post.findAndCountAll({
      offset: (page - 1) * pageSize,
      limit: pageSize
    })

    res.set('x-page', page)
    res.set('x-page-size', pageSize)
    res.set('x-total-count', result.count)
    res.json(result.rows)
  } catch (err) {
    next(err)
  }
})

export const exportExcel = asyncMiddleware(async (req, res, next) => {
  try {
    const result = await models.Post.findAndCountAll()

    // console.log(result);
    // You can define styles as json object
    const styles = {
      headerGreen: {
        fill: {
          fgColor: {
            rgb: 'FF11a771'
          }
        },
        font: {
          color: {
            rgb: 'FFFFFFFF'
          },
          sz: 14,
          bold: true
        },
        alignment: {
          vertical: 'center'
        }
      },
      cellPink: {
        fill: {
          fgColor: {
            rgb: 'FFFFCCFF'
          }
        }
      },
      cellGreen: {
        fill: {
          fgColor: {
            rgb: 'FF00FF00'
          }
        }
      }
    }

    //Array of objects representing heading rows (very top)
    // const heading = [
    //   [
    //     {value: '번호', style: styles.header},
    //     {value: '구분', style: styles.header},
    //     {value: '이름', style: styles.header},
    //     {value: '주차장명', style: styles.header},
    //     {value: '아이디', style: styles.header},
    //     {value: '회원구분', style: styles.header},
    //     {value: '회사명', style: styles.header},
    //     {value: '차량번호', style: styles.header},
    //     {value: '전화번호', style: styles.header},
    //     {value: '주소', style: styles.header}
    //   ]
    // ];

    //Here you specify the export structure
    const specification = {
      id: {
        // <- the key should match the actual data key
        displayName: '번호', // <- Here you specify the column header
        headerStyle: styles.headerGreen,
        width: 120 // <- width in pixels
      },
      title: {
        // <- the key should match the actual data key
        displayName: '제목', // <- Here you specify the column header
        headerStyle: styles.headerGreen,
        width: 120 // <- width in pixels
      },
      content: {
        // <- the key should match the actual data key
        displayName: '내용', // <- Here you specify the column header
        headerStyle: styles.headerGreen,
        width: 120 // <- width in pixels
      },
      delete: {
        // <- the key should match the actual data key
        displayName: '삭제여부', // <- Here you specify the column header
        headerStyle: styles.headerGreen,
        width: 120 // <- width in pixels
      },
      createdAt: {
        // <- the key should match the actual data key
        displayName: '생성일', // <- Here you specify the column header
        headerStyle: styles.headerGreen,
        width: 120 // <- width in pixels
      },
      updatedAt: {
        // <- the key should match the actual data key
        displayName: '변경일', // <- Here you specify the column header
        headerStyle: styles.headerGreen,
        width: 120 // <- width in pixels
      }
    }

    // The data set should have the following shape (Array of Objects)
    // The order of the keys is irrelevant, it is also irrelevant if the
    // dataset contains more fields as the report is build based on the
    // specification provided above. But you should have all the fields
    // that are listed in the report specification
    const dataset = []

    result.rows.map(async row => {
      const post = row.dataValues
      let data = {
        id: post.id,
        title: post.title,
        content: post.content,
        delete: post.delete ? '삭제' : '-',
        createdAt: post.createdAt,
        updatedat: post.updatedAt
      }

      dataset.push(data)
    })

    // Define an array of merges. 1-1 = A:1
    // The merges are independent of the data.
    // A merge will overwrite all data _not_ in the top-left cell.
    // const merges = [
    //   { start: { row: 1, column: 1 }, end: { row: 1, column: 10 } },
    //   { start: { row: 2, column: 1 }, end: { row: 2, column: 5 } },
    //   { start: { row: 2, column: 6 }, end: { row: 2, column: 10 } }
    // ]

    // Create the excel report.
    // This function will return Buffer
    const report = excel.buildExport([
      // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
      {
        name: 'Post', // <- Specify sheet name (optional)
        specification: specification, // <- Report specification
        data: dataset // <-- Report data
      }
    ])

    // You can then return this straight
    res.attachment('post.xlsx') // This is sails.js specific (in general you need to set headers)
    return res.send(report)
  } catch (err) {
    next(err)
  }
})

export const post = asyncMiddleware(async (req, res, next) => {
  const postBody = req.body

  try {
    const newPost = await models.User.create(postBody)
    res.json({ newPostId: newPost.id })
  } catch (err) {
    next(err)
  }
})

export const put = asyncMiddleware(async (req, res, next) => {
  const id = req.params.id
  const postBody = req.body

  try {
    const updatedPost = await models.Post.update(postBody, {
      where: { id }
    })

    res.json({ updatedPostId: updatedPost.id })
  } catch (err) {
    next(err)
  }
})

export const remove = asyncMiddleware(async (req, res, next) => {
  const id = req.params.id

  try {
    await models.Post.update(
      {
        deleted: true
      },
      {
        where: { id }
      }
    )

    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})
