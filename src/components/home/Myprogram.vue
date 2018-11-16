<template>
  <div>
     <!-- 顶部导航栏区域 -->
    <div class="Hometop">
       <topbar></topbar>
    </div>
    <div class="header">
      <p>提示：您的实名认证在审核中或者审核未通过，您发布的专辑和节目将在审核通过后向用户推荐分发</p>
    </div>
    <div class="main">
      <img src="../../images/microphone.png">
      <p>没有节目，赶快去发布节目吧！</p>
      <button @click="send">发布节目</button>
    </div>
  </div>
</template>

<script>
import topbar from '../subcomponents/topbar.vue'
export default {
   components:{
      'topbar': topbar,
    },
  methods: {
    send(){   
    this.$router.push({path: '/sendprogram'})
    }
  }
  
};  
</script>

<style lang="less" scoped>
  .Hometop /deep/ .nav a:nth-child(1){
    background-color: #ED3636;
  }
  .header {
    width: 100%;
    height: 120px;
    background-color: #f1f1f1;
    p{
      color: #ED3636;
      font-size: 14px;
      text-align: center;
      line-height: 120px;
    }
  }
  .main{
  text-align: center;
  padding-top: 3%;
  margin-bottom: 10%;
    img{
      width: 200px;
      height: 200px;
      margin-bottom: 36px;
    }
    p{
      height: 42px;
      color: #B2B2B2;
      font-size: 30px;
      text-align: center;
      margin-bottom: 54px;
    }
    button{
      background: #ED3636;
      width: 272px;
      height: 42px;
      color: #fff;
      border: none;
    }
  }





</style>




