<template>
  <div class="topBar">
    <img src="../../images/logo.png">
    <div class="nav">
      <a href="#" @click="myprogram()">我的节目</a>
      <a href="#" @click="sendprogram()">发布节目</a>
      <a href="#" @click="myalbum()">我的专辑</a>
      <!-- <router-link to="/myprogram">我的节目</router-link>
      <router-link to="/sendprogram">发布节目</router-link>
      <router-link to="/buildprogram">我的专辑</router-link> -->
    </div>
    <div class="topcontent" :style="{cursor : cursorType}">
      <img :src="photoUrl">
      <div class="userinfo" @click="Authentication()">
        <p class="name" >{{anchorName}}</p>
        <p class="ing">{{authStatus}}</p>
      </div>
      <span></span>
      <router-link class="exit" to="/login">退出</router-link>
    </div>
  </div>
</template>

<script>
export default{
  name:'topbar',
  data () {
    return {
      cursorType : 'pointer',
      photoUrl : '',
      anchorName : 'Cathy Murray',
      authStatus : '待审核'
    }
  },
  mounted () {
    this.init();
  },
  methods: {
    Authentication(){
      this.$router.push({ path: '/authentication'})
    },
    init() {
      this.axios.get(this.common.projectName_ + 'auth/queryAuthBasicFile.action?')
                 .then((response) => {
                    var result=response.data;
                    var resultMessage = this.common.checkResult(result);
                    if (result.code == 0) {
                      this.photoUrl = result.data.photoUrl;
                      this.anchorName =  result.data.anchorName;
                      if (result.data.authStatus == 2) {
                        this.authStatus = '已通过';
                      } else if (result.data.authStatus == 1) {
                        this.authStatus = '审核未通过';
                      } else {
                        this.authStatus = '待审核';
                      }
                    } else {
                      this.$message.error(resultMessage);
                    }
                 })
                 .catch(function(error){
                   console.log(error)
                 })
    },
    myprogram(){
      this.axios.get(this.common.projectName_ + 'program/queryProgram.action?')
                 .then((response) => {
                    var result=response.data;
                    var resultMessage = this.common.checkResult(result);
                    if (result.code == 0) {
                      if (result.data) {
                        this.$router.push({path:'/haveprogram'})
                      } else {
                        this.$router.push({path:'/myprogram'})
                      }
                    } else {
                      this.$message.error(resultMessage);
                    }
                 })
                 .catch(function(error){
                   console.log(error)
                 })
    },
    sendprogram(){
      this.$router.push({path:'/sendprogram'})
    },
    myalbum(){
      this.axios.get(this.common.projectName_ + 'album/queryAlbum.action?')
                 .then((response) => {
                    var result=response.data;
                    var resultMessage = this.common.checkResult(result);
                    if (result.code == 0) {
                      if (result.data) {
                          this.$router.push({path:'/havealbum'})
                      } else {
                          this.$router.push({path:'/buildalbum'})
                      }
                    } else {
                      this.$message.error(resultMessage);
                    }
                 })
                 .catch(function(error){
                   console.log(error)
                 })
    }
  }
}
</script>

<style lang="less" scoped>
  .topBar {
    width: 100%;
    height: 61px;
    background-color: #3D4658;
    display: flex;
    justify-content: center;

    img {
      width: 137.1px;
      height: 46px;
      margin-top: 7.5px;
    }

    .nav {
      display: flex;
      margin-left: 114px;
      margin-right: 220px;

      a {
        width: 110px;
        height: 61px;
        color: #fff;
        line-height: 61px;
        display: block;
        text-align: center;
        font-size: 16px;
      }

      a:hover {
        text-decoration: none;
      }
    }

    .topcontent {
      display: flex;

      img {
        width: 40px;
        height: 40px;
        margin-top: 11px;
        border-radius:20px;
      }

      .userinfo {
        margin-left: 10px;

        .name {
          color: #fff;
          font-size: 14px;
          padding-top: 11px;
        }

        .ing {
          color: #B2B2B2;
          font-size: 12px;
          padding-bottom: 10px;
          line-height: 0;
        }
      }

      span {
        width: 1px;
        height: 10px;
        background-color: #B2B2B2;
        margin-left: 15px;
        line-height: 61px;
        margin-top: 18px;
      }

      .exit {
        color: #B2B2B2;
        font-size: 12px;
        margin-left: 11px;
        line-height: 61px;
      }

      a:hover {
        text-decoration: none;
      }
    }
  }
</style>