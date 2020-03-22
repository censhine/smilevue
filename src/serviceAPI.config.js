const BASE = 'http://192.168.0.108:7300/mock/5e70e23ba8a9d0b7fe971829/SmileVue'
const LOCALAPI = 'http://192.168.0.108:3000'
const URL = {
    getHomeInfo: BASE + '/getHomeInfo',
    getGoodsInfo: BASE + '/getGoodsInfo',
    registerUser: LOCALAPI + '/user/register',
    loginUser: LOCALAPI + '/user/login',
    getDetailGoodsInfo: LOCALAPI + '/goods/getDetail',
    getCategoryList: LOCALAPI + '/goods/getCategoryList',
    getCategorySubList: LOCALAPI+'/goods/getCategorySubList',
    getCategoryGoodsList: LOCALAPI + '/goods/getCategoryGoodsList',
}
module.exports = URL