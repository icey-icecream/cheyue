<template>
  <div class="Sendprogram">
    <!-- 顶部导航栏区域 -->
    <div class="Hometop">
       <topbar></topbar>
    </div>
    <!-- 主体区域 -->
    <div class="main">
      <div class="title" style="margin-bottom:30px;">创建专辑</div>
      <el-form style="margin-bottom:200px;" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
        <!-- 分割线上半部分 -->
         <el-form-item style="text-align:left;" label="专辑名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>    
          <!-- 专辑封面 -->
          <el-form-item label="专辑封面">
          <div id="programImg">
            <div class="chooseImg">
            <upload :uploadType="`head`" ref="upload"></upload>
            </div>
          <p>文件&lt;3M，最佳尺寸960x960，支持 jpg、 png图片格式</p>
          </div>
        </el-form-item>
        <!-- 专辑类型 -->
         <el-form-item label="专辑类型">
          <el-select v-model="ruleForm.region" placeholder="电台">
            <el-option label="电台" value="0"></el-option>
            <el-option label="音乐" value="1"></el-option>
          </el-select>
        </el-form-item>
        <!-- 选择语音 -->
        <el-form-item label="语言">
            <div class="language">
              <div class="chooseLanguage">
                <p v-for="language in languages" class="aa" :class="{active: activeName == language}" @click="selected(language)"
                  v-bind:key>{{language}}</p>
              </div>
            </div>
        </el-form-item>
         <!-- 节目标签 -->
        <el-form-item label="节目标签" style="margin-top: -24px;">
          <div class="labeldetail">
          <tagsinput v-model='tags' ref="tagsinput"/>
          <p class="labelnumber" style="font-size:12px;color:#BBBBBB;" >最多5个标签，单个标签最长8个汉字，按回车或点击空白区域确定</p>
        </div>   
        </el-form-item>
        <!-- 专辑介绍 -->
        <el-form-item label="简介" prop="desc">
          <div class="introduction" style="display:flex;">
            <textarea style="border-radius:4px;margin-right:5px;width: 423px;height: 132px;border: 1px solid #ccc;padding-left: 14px;" placeholder="请输入10-200字" v-model="ruleForm.desc" ref="count"/>
            <p style="margin-top: 103px;color: #ccc;" class="total" v-html="number"></p><p class="total" style="margin-top: 103px;color: #ccc;">/200</p>
          </div>
        </el-form-item>
        <!-- 是否公开 -->
        <el-form-item label="是否公开">
          <div class="chooseSecret">
            <radioSecrect v-on:childByValue="childByValue" ref="radioSecrect"></radioSecrect>
          </div>
        </el-form-item>      
        <el-button @click="submitForm('ruleForm')">立即创建</el-button>    
      </el-form>      
    </div>   
  </div>
</template>

<script>
import upload from '../subcomponents/upload.vue'
import radioSecrect from '../subcomponents/radio-secrect.vue'
import tagsinput from '../subcomponents/tagsinput.vue'
import topbar from '../subcomponents/topbar.vue'
 export default {
    name: 'Radio',
    components: {
      'upload': upload,
      'radioSecrect': radioSecrect,
      'tagsinput':tagsinput,
      'topbar': topbar,
    },
    data() {
      return {
        secrect: '',
        show: true,
        count: '',
        timer: null,
        number:'0',
        ruleForm: {
          desc:'',
        },
        albumnumber:'5',
        data:[],
        tags: [],
        languages: ['普通话', '粤语', '英语', '其他'],
        activeName: '普通话',
        changeStyle:-1,
        ruleForm: {
          name: "",
          region: "",
          delivery: false,
          type: [],
          desc: "",
        },
        rules: {
          name: [{
              required: true,
              message: "请输入专辑名称",
              trigger: "blur"
            },
            {
              min: 1,
              max: 10,
              message: "长度在 1 到 10 个字符",
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
            message: "请填写上传节目",
            trigger: "blur"
          }],
        }
      }
    },


    methods: {
      childByValue: function (childValue) {
        // childValue就是子组件传过来的值
        this.secrect = childValue;

      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             var params = new URLSearchParams();
             params.append('albumName',this.ruleForm.name);
             params.append('albumPhotoUrl',this.$refs.upload.imageUrl);
             params.append('albumType',this.ruleForm.region);
             var albumLanguageType;
             if (this.activeName == '粤语') {
                 albumLanguageType =1;
             } else if (this.activeName == '英语') {
                 albumLanguageType =2;
             } else if (this.activeName == '其它') {
                 albumLanguageType =3;
             } else {
                 albumLanguageType =0;
             }
             params.append('albumLanguageType',albumLanguageType);
             var tagsArray = this.$refs.tagsinput.dynamicTags;
             var tagsResult="";
             for (var i = 0; i < tagsArray.length; i++) {
               if (i == tagsArray.length -1) {
                 tagsResult += tagsArray[i]
               } else {
                 tagsResult += tagsArray[i] + "|";
               }
             }
             params.append('albumLabel',tagsResult);
             params.append('albumIntroduce',this.ruleForm.desc);
             var isPublic;
             if (this.secrect == '私密') {
                isPublic = 1;
             } else {
                isPublic = 0;
             }
             params.append('isPublic',isPublic);
             this.axios.post(this.common.projectName_ + 'album/createAlbum.action?',params)
            .then((response) => {
              var result=response.data;
              //检查后台返回结果
              var resultMessage = this.common.checkResult(result);
              if (result.code == 0) {
                    this.$router.push({path : '/havealbum'});
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      changeHandler(value) {
        console.log('改变之后的值是:' + value)
      },
      imageUrl(data) {
        //data  得到的就是返回的图片路径的相关参数
      },
      // 选择语言
      selected: function (language) {
          this.activeName = language
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
      }
    }
  };
</script>

<style lang="less" scoped>
  page {
    padding: 0;
    margin: 0;
    width: 100%;
  }
  .el-select-dropdown__item.selected{
    color:#3D4658!important;
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
    width: 423px !important;
  }

  .el-textarea {
    width: 423px !important;
    height: 132px;
  }
  .el-textarea__inner{
    min-height: 132px;
  }
  .el-select {
    width: 423px;
  }
  .el-button{
    width: 272px;
    height: 42px;
    color: #fff;
    background: #c0c0c0;
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
  .Hometop /deep/ .nav a:nth-child(3){
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
     .language{
      width: 100%;
      display: flex;
      margin-bottom: 34px;
      .languageTitle{
        margin-left: 10px;
        margin-right: 83px;
        font-size: 14px;
        padding-top: 9px;
      }
      .chooseLanguage{
        width: 423px;
        height: 38px;
        border: 1px solid #CDCDCD;
        display: flex;
        p{
          width: 106px;
          line-height: 38px;
          text-align: center;
          border-right: 1px solid #CDCDCD;
          height: 38PX;
          font-size: 14px;
        }
        P:last-child{
          border-right: none;
        }
        .active{
            color: #fff;
            background-color: #3D4658;
        }
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