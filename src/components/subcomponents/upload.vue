<template>
  <div class="avatar" :style="{'pointer-events' : photoUrlDis}">
    <el-upload
  class="avatar-uploader"
  accept=".jpeg,.png"
  :action="uploadImageUrl"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar uploadImage" id="imgavatar" >
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  </div>
</template>
<script>
  export default {
    name:"upload",
    data() {
      return {
        imageUrl: '',
        photoUrlDis : 'auto',
        uploadImageUrl : ''
      };
    },
    mounted () {
      this.getImageUrl();
    },
    methods: {
      handleAvatarSuccess(response, file) {
              if (response.data) {
                  this.imageUrl = response.message;
              } else {
                this.$message.error(response.message);
              }
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'||file.type === 'image/png';
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片格式不正确!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      getImageUrl () {
        this.uploadImageUrl = this.common.projectName_ + 'common/uploadImage.action?';
      }
    }
  }
</script>

<style lang="less">
input[type=file]{
  display: none;
}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #3d4658;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
</style>

