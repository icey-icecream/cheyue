<template>
  <div class="addmain">
    <div class="down">
      <div v-for="(program, index) in programList" style="margin-bottom:10px;" :key="program.index">
        <div class="addprogram">
        <el-form-item label="" prop="uploadprogram">
            <div class="sendUp" style="display:flex;">
            <el-upload class="upload-demo"
              accept=".mp3,.wav"
              :action="getVoiceUrl ()"
              :limit="1"
              :on-change="handleChange"
              :before-upload="beforeUploadAudio"
              :on-success="handleAudioSuccess">
              <el-button style="color:#3D4658; border:1px solid #3D4658;margin-right:5px;">上传声音</el-button>
            </el-upload>
             <el-input v-model="program.name" placeholder="节目名称，30字以内" type="primary"></el-input>
             </div>
             <!-- <p style="color:#BBBBBB;margin:0;">我们支持MP3/WAV文件格式，音频&lt;200M，请尽量上传高音质音频</p>    -->
        </el-form-item>
        </div>
        <p id="del" @click="openMask(program)" style="z-index:999;">删除</p>
      </div>
      <!-- 弹框 -->
      <div>
        <dialog-bar v-model="sendVal" type="danger" title="确定要删除此节目?" v-on:cancel="clickCancel()" @danger="clickDanger()"
          dangerText="确定"></dialog-bar>
      </div>
    </div>
  </div>
</template>

<script>
  import dialogBar from '../subcomponents/dialog.vue'
  export default {
    name: 'addprogarm',
    props: ['programList'],
    components: {
      'dialog-bar': dialogBar,
    },
    data() {
      return {
        sendVal: false,
        items: {
          text: '',
        },
      }
    },
    mounted() {
      this.getVoiceUrl();
    },
    methods: {
      openMask(param = {}) {
        this.sendVal = true;
        this.items = { ...this.items,
          ...param
        };
      },
      clickCancel() {
        console.log('点击了取消');
      },
      clickDanger() {
        var myself = this
        myself._props.programList.map(function (d, f) {
          if (d.id == myself.items.id) {
            myself._props.programList.splice(f, 1);
            myself.sendVal = false;
          }
        });
      },
      // 上传节目
      handleChange(file, fileList) {

        this.fileList3 = fileList.slice(-3);
      },
       // 上传音频格式校验
      beforeUploadAudio(file) {
       const isMP3 = file.type === 'audio/mp3'||file.type === 'audio/wav';
        const isLt200M = file.size / 1024 / 1024 < 200;
        if (!isMP3) {
          this.$message.error('上传音频文件格式不正确!');
        }
        if (!isLt200M) {
          this.$message.error('上传音频文件大小不能超过 200MB!');
        }
        return isMP3 && isLt200M;
      },
      // 上传成功
      handleAudioSuccess(response, file) { //获取上传图片地址
          var size = this._props.programList.length;
          if (response.data) {
            this._props.programList[size-1].src = response.message;
          } else {
            this.$message.error(response.message);
          }
      },
      getVoiceUrl () {
        return this.common.projectName_ + 'program/uploadVoice.action?';
      }
    }
  }
</script>
<style>
 .sendUp .el-input{
    width: 315px!important;
  }
  .el-form-item__content{
    width: 423px;
  }
</style>


<style lang="less" scoped>
  .el-upload-list__item:first-child{
  margin-top:0;
  }
  .el-upload-list__item .el-progress{
      margin-left: 126px!important;
      width: 72%!important;
      margin-top: -32px!important;
  }
  .el-upload-list {
    width: 300px;
    margin-left: 109px!important;
    margin-top: -43px!important;
}

  .el-form-item__content {
    width: 500px;
  }

  .down {
    margin-top: 22px;
    width: 100%;

    #del {
      float: right;
      color: #0046FF;
      font-size: 14px;
      margin-top: -68px;
      cursor: pointer;
    }

    .text {
      margin-left: 121px;
      color: #BBBBBB;
      font-size: 12px;
      margin-top: 10px;
    }
  }
</style>