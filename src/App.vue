<template>
<div id="app">
  <!-- 中部区域 -->
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  <!-- footer区域 -->
  <div class="footer">
    <p>Copyright&#169;2018 广东翼卡车联网服务有限公司 · 粤ICP备16017272号-3</p>
  </div>
</div>
</template>

<script>

</script>
<style lang="less" scoped>
*{
  margin: 0;
  padding: 0;
}
#app{
  position: relative;
  min-height: 100%;
  overflow-x:hidden;
}

.v-enter{
	transform: translateX(100%);
}
.v-leave-to{
	transform: translateX(-100%);
	position: absolute;
}

.v-enter-active,
.v-leave-active{
	transition: all 0.5s ease;
}
.footer{
  height:120px;
  background-color: #3D4658;
  text-align: center;
  bottom: 0;
  position: absolute;
  left: 0;
  right: 0;
  p{
    font-size: 12px;
    color: #B2B2B2;
    line-height: 120px;
  }
}
</style>
