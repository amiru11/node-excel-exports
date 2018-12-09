/**
 * 페이지네이션 객체
 *
 * @author Moon SeongHwan <moon497&edkim.co>
 */
class pagination {
  /**
   * req.query를 받아서 페이지네이션 결과값으로 리턴해주는 함수
   *
   * @param page Page
   * @param rpp Rows Per Page
   *
   * @memberof pagination
   */
  static getPagination({ page = 1, rpp = 10 }) {
    const limit = Number(rpp)
    const offset = (Number(page) - 1) * Number(rpp)

    return { limit, offset, rpp: limit }
  }

  /**
   * findAndCountAll로 리턴받은 객체를 페이지네이션 포함해서 컨버팅해주는 함수
   *
   * @memberof pagination
   */
  static convertFindAndCountAll(obj, rpp, isRaw = false) {
    const pagingObject = {
      rows: obj.rows,
      pagination: {
        totalRecordCount: obj.count,
        recordCountPerPage: rpp,
        totalPageCount: Math.floor((obj.count - 1) / rpp) + 1
      }
    }

    return pagingObject
  }
}

module.exports = pagination
