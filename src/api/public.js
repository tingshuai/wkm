import axios from 'axios'
// axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded'
let port = '';
//请求方法
export default {
  fetchGet(url, data={}) {
    let params = data.params ? this.setParams(data.params) : {};
    return new Promise((resolve, reject) => {
      axios.get(this.getPocPort() + url, {
        params
      }).then(res => {
        if (res.data.result) {
          resolve(res.data)
        } else {
          if (data.Vue) {
            data.Vue.$message.error(res.data.message);
          }
        }
      }).catch(error => {
        if (data.Vue) {
          data.Vue.$message.error('系统异常');
        }
      })
    })
  },
  fetchQuickSearch(url,Vue) {
    return new Promise((resolve, reject) => {
      axios.get(this.getPocPort() + url).then(res => {
        if (res.data.result) {
          resolve(res.data)
        } else {
          if (Vue) {
            Vue.$message.error(res.data.message);
          }
        }
      }).catch(error => {
        if (Vue) {
            Vue.$message.error('系统异常');
        }
      })
    })
  },
  fetchPost(url, data={}) {
    let params = data.params ? this.setParams(data.params) : {};
    return new Promise((resolve, reject) => {
      axios.post(this.getPocPort() + url, params).then(res => {
        console.log(typeof res.data)
        if (res.data.result) {
          resolve(res.data)
        } else {
          if (data.Vue) {
            data.Vue.$message.error(res.data.message);
          }
        }
      }).catch(error => {
        if (data.Vue) {
          data.Vue.$message.error('系统异常');
        }
      })
    })
  },
  fetchPostJson(url, data={}) {
    return new Promise((resolve, reject) => {
      axios.post(this.getPocPort() + url, data.params).then(res => {
        if (res.data.result) {
          resolve(res.data)
        } else {
          if (data.Vue) {
            data.Vue.$message.error(res.data.message);
          }
        }
      }).catch(error => {
        if (data.Vue) {
          data.Vue.$message.error('系统异常');
        }
      })
    })
  },
  setParams(params) {
    let fdata = new URLSearchParams();
    for (let attr in params) {
      if(params[attr]){
        fdata.append(attr, params[attr]);
      }
    }
    return fdata;
  },
  getPocPort() {
    if (!port) {
      port = localStorage.getItem('pocPort');
    }
    return port;
  }
}
