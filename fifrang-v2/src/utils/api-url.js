export const API = {
    /* 계정 식별자 조회 */
    GET_USER_OUID: '/fconline/v1/id?nickname',
    /* 구단주명 조회 */ 
    GET_OWNER_NAME: '/fconline/v1/user/basic?ouid',
    /* 최근 10 게임의 ouid 조회 */
    GET_LATEST_10_GAME_OUID: '/fconline/v1/user/match',
    /* 게임의 상세정보 조회 */
    GET_DETAIL_GAME_INFO: '/fconline/v1/match-detail?matchid',
    /* 매치타입 조회 */
    GET_MATCH_TYPE: '/static/fconline/meta/matchtype.json',
};
