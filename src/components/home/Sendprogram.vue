<template>
  <div class="Sendprogram">
    <!-- 顶部导航栏区域 -->
    <div class="Hometop">
       <topbar></topbar>
    </div>
    <!-- 主体区域 -->
    <div class="main">
      <div class="title" style="margin-bottom:30px;">发布节目</div>
      <input hidden  id="programId">
      <el-form style="margin-bottom:200px;" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
        <!-- 分割线上半部分 -->
        <el-form-item label="选择专辑">
         <div class="selectArea">
            <el-select v-model="ruleForm.region" @change="checkAblum()">
            <el-option v-for="album in albumList" :value="album.id" :label="album.albumName" :key="album.id">
            </el-option>
          </el-select>
          <router-link to="/buildAlbum" class="buildAlbum">创建专辑</router-link>
         </div>
        </el-form-item>
        <!--上传专辑期数 -->
        <el-form-item style="margin-top:-30px;" label="">
           <p style="color:#BBBBBB;font-size:12px;">{{albumnumber}}</p>
        </el-form-item>

        <el-form-item label="上传节目" prop="uploadprogram">
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
             <el-input style="315px!important;" v-model="ruleForm.uploadprogram" placeholder="节目名称，30字以内" type="primary"></el-input>
             </div>
             <p style="color:#BBBBBB;margin:0;">我们支持MP3/WAV文件格式，音频&lt;200M，请尽量上传高音质音频</p>
        </el-form-item>

        <!-- 分隔虚线 -->
        <el-form-item style="height:1px; border:0.5px dashed #ccc;"></el-form-item>
        <!-- 分割线下半部分 -->
        <!-- 添加声音 -->
          <div class="addsubArea">
          <div id="addmain" :data="data" >
            <addprogram  :programList="programList"></addprogram>
          </div>
          </div>
          <div class="addmore" @click="addsub">
            <img src="../../images/add.png">
            <p>添加节目</p>
          </div>
          <!-- 节目图像 -->
          <el-form-item label="节目图像">
          <div id="programImg">
            <div class="chooseImg">
            <upload :uploadType="`head`" ref="upload"></upload>
            </div>
          <p>文件&lt;3M，最佳尺寸960x960，支持 jpg、 png图片格式</p>
          </div>
        </el-form-item>
        <!-- 节目标签 -->
        <el-form-item label="节目标签" prop="programtag">
          <div class="labeldetail">
          <tagsinput v-model='tags' ref="tagsinput"/>
          <p class="labelnumber" style="font-size:12px;color:#BBBBBB;height:20px;" >最多5个标签，单个标签最长8个汉字，按回车或点击空白区域确定</p>
        </div>
        </el-form-item>
        <!-- 主播 -->
         <el-form-item style="text-align:left;" label="主播名" prop="singername">
          <el-input v-model="ruleForm.singername"></el-input>
        </el-form-item>
        <!-- 节目简介 -->
        <el-form-item label="简介" prop="desc">
          <div class="introduction" style="display:flex;width: 464px;">
            <textarea style="border-radius:4px;margin-right:5px;width:423px;height: 132px;border: 1px solid #ccc;padding-left: 14px;" placeholder="请输入10-200字" v-model="ruleForm.desc" ref="count"/>
            <p style="margin-top: 103px;color: #ccc;" class="total" v-html="number"></p><p class="total" style="margin-top: 103px;color: #ccc;">/200</p>
          </div>
        </el-form-item>
        <el-button class="sendbutton" @click="submitForm('ruleForm')">发布，并继续上传</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
 import dialogBar from '../subcomponents/dialog.vue'
 import upload from '../subcomponents/upload.vue'
 import tagsinput from '../subcomponents/tagsinput.vue'
 import topbar from '../subcomponents/topbar.vue'
 import addprogram from '../subcomponents/addprogram.vue'
 export default {
    name: 'Radio',
    components: {
      'upload': upload,
      'topbar':topbar,
      'addprogram':addprogram,
      'tagsinput': tagsinput,
    },
    data() {
    var uploadprogram = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入节目名称'));
      }else {
        callback();
      }
      };
      var programtag = (rule,value,callback) => {
      var tagsArray = this.$refs.tagsinput.dynamicTags;
      if (tagsArray === '') {
        callback(new Error('请输入节目标签'));
      }else {
        callback()
      }
      };
      return {

        radioSex: '男',
        show: true,
        count: '',
        timer: null,
        number:'0',
        programList:[],
        data:[],
        tags: [],
        albumList : [{
          id : '',
          albumName : '非必选,可根据需要添加专辑'
        }],
        albumnumber : '',
        voiceUrl : '',
        ruleForm: {
          name: "",
          region: "",
          delivery: false,
          type: [],
          desc: "",
         uploadprogram:"",
         singername:"",
         programtag:"",
        },
        fileList3: [],
        rules: {
          name: [{
              required: true,
              message: "请输入活动名称",
              trigger: "blur"
            },
            {
              min: 3,
              max: 5,
              message: "长度在 3 到 5 个字符",
              trigger: "blur"
            }
          ],
          realname: [{
            required: true,
            message: "请填写真实姓名",
            trigger: "blur"
          }],
          uploadprogram: [{
            required: true,
            validator: uploadprogram,
            trigger: 'blur'
          }],
          singername:[{
            required: true,
            message: "请填写主播名",
            trigger: "blur"
          }],
           programtag:[{
            required: true,
            validator: programtag,
            trigger: "blur"
          }],
        }
      }
    },
    mounted() {
        this.getVoiceUrl();
        this.axios.get(this.common.projectName_ + 'program/listAlbumName.action?')
                  .then((response) => {
                    var result=response.data;
                    //检查后台返回结果
                    var resultMessage = this.common.checkResult(result);
                    if (result.code == 0) {
                       if (result.data.length > 0) {
                          this.albumList = result.data;
                          this.ruleForm.region = result.data[0].id;
                          this.albumnumber = '本专辑已上传' + result.data[0].userId + '期';
                          this.ruleForm.singername = result.data[0].albumIntroduce;
                       }
                    } else {
                      this.$message.error(resultMessage);
                    }
                  })
                  .catch(function(error) {
                    console.log(error)
                  });
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var params = new URLSearchParams();
            params.append('albumId', this.ruleForm.region);
            params.append('programPhotoUrl', this.$refs.upload.imageUrl);
            var tagsArray = this.$refs.tagsinput.dynamicTags;
             var tagsResult="";
            //  判断是否有标签
            //  if (tagsArray='') {
            //     this.$mesage.error("请输入节目标签")
            //  }
             for (var i = 0; i < tagsArray.length; i++) {
               if (i == tagsArray.length -1) {
                 tagsResult += tagsArray[i]
               } else {
                 tagsResult += tagsArray[i] + "|";
               }
             }
            params.append('programLabel', tagsResult);
            params.append('anchorName', this.ruleForm.singername);
            params.append('programIntroduce', this.ruleForm.desc);
            params.append('baseProgramName',this.ruleForm.uploadprogram);
            params.append('baseVoiceUrl',this.voiceUrl);
            var oldProgramArray = this.programList;
            var newProgramArray =[];
            for (var i =0; i < oldProgramArray.length; i++) {
              var nameUrl = oldProgramArray[i].name + "|" + oldProgramArray[i].src
              newProgramArray.push(nameUrl);
            }
            params.append('voiceUrl',newProgramArray.toString());
            this.axios.post(this.common.projectName_ + 'program/publishProgram.action?',params)
            .then((response) => {
              var result=response.data;
              //检查后台返回结果
              var resultMessage = this.common.checkResult(result);
              if (result.code == 0) {
                 this.$router.push({path : '/haveprogram'});
              } else {
                this.$message.error(resultMessage);
              }
            })
            .catch(function (error) {
              console.log(error);
            })
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      getVoiceUrl () {
          return this.common.projectName_ + 'program/uploadVoice.action?';
      },
      checkAblum () {
        var albumId = this.ruleForm.region;
        this.axios.get(this.common.projectName_ + 'program/checkAblum.action?albumId='+albumId)
            .then((response) => {
              var result=response.data;
              //检查后台返回结果
              var resultMessage = this.common.checkResult(result);
              if (result.code == 0) {
                this.albumnumber = '本专辑已上传' + result.data + '期';
              } else {
                this.$message.error(resultMessage);
              }
            })
            .catch(function (error) {
              console.log(error);
            })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      changeHandler(value) {
        console.log('改变之后的值是:' + value)
      },
      // 上传节目
      handleChange(file, fileList) {
        this.fileList3 = fileList.slice(-3);
      },
      // 增加子组件
       addsub(){
      	var myself = this
        var param = {id:new Date().getTime(),name:"",src:""}
      	myself.programList.push(param)
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
        if (response.data) {
            this.voiceUrl = response.message;
        } else {
          this.$message.error(response.message);
        }
      },
    },
    watch:{ //watch()监听某个值（双向绑定）的变化，从而达到change事件监听的效果
      ruleForm:{
      handler:function(){
      var _this = this;
      var _sum = 200; //字体限制为200个
      _this.$refs.count.setAttribute("maxlength",_sum);
      _this.number= _this.$refs.count.value.length;
      },
      deep:true
      },
    }
  };
</script>
<style>
   /* 消除发布节目页面增加节目的进度删除键 */
   .addsubArea #addmain .el-upload-list__item .el-icon-close{
      visibility: hidden;
   }
    .upload-demo{
    width: 105px;
    height:62px;
  }
  .sendUp .el-input{
    width: 315px!important;
  }
   .el-textarea {
    width: 423px !important;
    height: 132px;
  }
  .buildAlbum{
    width: 100px;
    height: 38px;
    display: block;
    border: 1px solid #666;
    margin-left: 5px;
    border-radius: 5px;
    text-align: center;
    color: #666;
  }
  .selectArea{
    display: flex;
    margin-left: 0;
  }
  .selectArea .el-select{
    width: 315px;
  }
</style>


<style lang="less" scoped>
  page {
    padding: 0;
    margin: 0;
    width: 100%;
  }

  .el-upload__input{
    display:none;
  }
  .el-upload-list .el-upload-list--text{
    width:423px;
  }

  .el-form-item__label {
    text-align: left !important;
  }

  .el-input {
    width: 423px;
  }

  .el-textarea {
    width: 423px !important;
    height: 132px;
  }
  .el-textarea__inner{
    min-height: 132px;
  }
  .sendbutton{
    width: 272px;
    height: 42px;
    color: #fff;
    background: #ED3636;
    margin-left: 259px;
    margin-top: 15px;
  }
  #programImg{
    display: flex;
    width: 600px;
    p{
      color: #BBBBBB;
      margin-left: 10px;
      margin-top: -6px;
    }
  }
  .Hometop /deep/ .nav a:nth-child(2){
     background-color: #ED3636;
  }
  .main {
    width: 51.6%;
    margin: 36px auto;

    .title {
      height: 42px;
      background-color: #f1f1f1;
      font-size: 16px;
      line-height: 42px;
      padding-left: 10px;
    }
     .addmore{
      display: flex;
      width: 423px;
      height: 42px;
      margin-left: 130px;
      border: 1px solid #3D4658;
      line-height: 42px;
      margin-top: 19px;
      margin-bottom:42px;
      img{
        width: 16px;
        height: 16px;
        margin-top: 13px;
        margin-left: 169px;
        margin-right: 5px;
      }
      p{
        color: #3D4658;
        font-size: 16px;
      }
    }
    .form-group {
      display: flex;
       .cArea{
      display: flex;
    }
    }


  }



  .save {
    width: 272px;
    line-height: 42px;
    background: #c0c0c0;
    color: #fff;
    text-align: center;
    margin: 0 auto;
    margin-top: 54px;
  }

  .look {
    width: 272px;
    margin-left: 259px;
    text-align: center;
    display: block;
    color: #3d4658;
    margin-top: 10px;
  }

  a:hover {
    text-decoration: none;
  }
</style>