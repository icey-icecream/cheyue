<template>
  <div>
    <div class="topBar">
      <img src="../../images/logo.png">
      <div class="topcontent">
        <router-link class="exit" to="/login">退出</router-link>
      </div>
    </div>
    <div class="header">
      <div class="content">
        <div class="left common">
          <img src="../../images/waiting1.png">
          <p>填写资料</p>
        </div>
        <span></span>
        <div class="right common">
          <img src="../../images/waiting.png">
          <p>等待审核</p>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="title" style="margin-bottom:30px;">个人资料</div>
      <input hidden v-model="userId">
      <input hidden  id="authStatus">
      <el-form style="margin-bottom:200px;" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
        <el-form-item style="text-align:left;" label="主播名/歌手名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <div id="programImg">
            <div class="chooseImg">
            <upload :uploadType="`head`" ref="upload"></upload>
            </div>
          <p>文件&lt;3M，最佳尺寸960x960，支持 jpg、 png图片格式</p>
          </div>
        </el-form-item>
        <el-form-item style="margin:0;" label="性别">
          <div class="chooseSex">
          <radio v-on:childByValue="childByValue" ref="radio"></radio>
          </div>
        </el-form-item>
        <el-form-item label="简介" prop="desc">
          <div class="introduction" style="display:flex;">
            <textarea style="border-radius:4px;margin-right:5px;width: 423px;height: 132px;border: 1px solid #ccc;padding-left: 14px;" placeholder="请输入10-200字" v-model="ruleForm.desc" ref="count"/>
            <p style="margin-top: 103px;color: #ccc;" class="total" v-html="number"></p><p class="total" style="margin-top: 103px;color: #ccc;">/200</p>
          </div>
        </el-form-item>
        <div class="title" style="margin-bottom:30px;">实名资料</div>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="ruleForm.realname" v-bind:disabled = "realNameDis"></el-input>
        </el-form-item>
        <el-form-item label="证件类型" prop="idtype">
          <el-select v-model="ruleForm.idtype" placeholder="公民身份证">
            <!-- <el-option label="护照" value="huzhao"></el-option>
      <el-option label="港澳通行证" value="gangao"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码" prop="idnumber">
          <el-input v-model="ruleForm.idnumber" v-bind:disabled = "cardDis"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phonenumber">
          <el-input v-model="ruleForm.phonenumber" v-bind:disabled = "phoneDis"></el-input>
        </el-form-item>      
        <el-form-item label="验证码" prop="code" v-show="codeShow">
          <div class="codeArea">
          <el-input id="getcode" placeholder="请输入验证码" type="text" v-model="ruleForm.code" autocomplete="off"></el-input>
          <span class="getCodeBefore" v-show="show" @click="getCode">获取验证码</span>
          <span v-show="!show" class="count getCodeBefore">{{count}} s</span>
          </div>
        </el-form-item>
        <el-form-item label="证件图" prop="IDimg">
            <div class="cArea" style="display:flex;margin-bottom:20px;">              
              <div class="sendC">
                <uploadZ :uploadType="`head`" ref="uploadZ">
                  <p class="CText">证件正面图</p>
                </uploadZ>
                <p class="CText">证件正面图</p>
              </div>
              <div class="sendC">
                <uploadF :uploadType="`head`" ref="uploadF"></uploadF>
                <p class="CText">证件反面图</p>
              </div>
              <div class="sendC">
                <uploadHAND :uploadType="`head`" ref="uploadHAND"></uploadHAND>
                <p class="CText">手持证件照片</p>
              </div>
            </div>    
        </el-form-item>
        <el-form-item label="">
        <div class="cardrule">
              <p>1、根据国家相关规定，请提供身份有效证件的彩色扫描件或清晰的数码照片 </p>
              <p>2、身份证需提供身份证正面图、身份证反面图、手持身份证图 </p>
              <p>3、护照、港澳往来通行证、台湾往来通行证，需提供身份信息页图、手持证件图 </p>
              <p>4、支持.jpg、.png格式的图片或照片，且图片大小不超过2M</p>  
            </div> 
        </el-form-item>
         <el-form-item label="" prop="checked">
           <el-checkbox v-model="ruleForm.checked" style="color:#ED3636;">我已阅读并同意《作品上传协议》</el-checkbox>
        </el-form-item>
        <el-button @click="submitForm('ruleForm')">提交审核</el-button>
        <router-link class="look" to="/agreement">查看协议</router-link>       
      </el-form>      
    </div>   
  </div>
</template>

<script>
  import upload from "../subcomponents/upload.vue"
  import radio from '../subcomponents/radio.vue'
  import uploadZ from '../subcomponents/upload-IDz.vue'
  import uploadF from '../subcomponents/upload-IDf.vue'
  import uploadHAND from '../subcomponents/upload-IDhand.vue'
  export default {
    name: 'Radio',
    components: {
      'upload': upload,
      'radio': radio,
      'uploadZ':uploadZ,
      'uploadF':uploadF,
      'uploadHAND':uploadHAND
    },
    data() {
          var validateidnumber = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输身份证号码'));
        } else {
         if (value && (!(/\d{17}[\d|x]|\d{15}/).test(value) || (value.length !== 15 && value.length !== 18))) {
            callback(new Error('身份证号码不符合规范'))
          } else {
            this.checkCard ('getCardResult',function (checkResult) {
                if (!checkResult) {
                  callback(new Error('身份证号码已存在'));
                } else {
                  callback();
                }
            });
          }
        }
      };
      var validatephonenumber = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'));
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          if (reg.test(value)) {
            this.checkPhone ('getPhoneResult',function (checkResult) {
                if (!checkResult) {
                  callback(new Error('手机号码已存在'));
                } else {
                  callback();
                }
            });
          } else {
            return callback(new Error('请输入正确的手机号'));
          }
        }
      };
      var validateIDimg = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请上传证件照"));
      } else {
        var imgIDz = $("#imgIDz").attr("src");
        var imgIDf = $("#imgIDf").attr("src");
        var imgIDhand = $("#imgIDhand").attr("src");
        if (imgIDz == "") {
          return callback(new Error("请上传身份证正面照片"));
        } else if (imgIDf == "") {
          return callback(new Error("请上传身份证背面照片"));
        } else if (imgIDhand == "") {
          return callback(new Error("请上传手持身份证照片"));
        } else {
          callback();
        }
      }
    };
       var validateChecked = (rule, value, callback) => {
        if (value !== true) {
          console.log(value)
          callback(new Error("请同意协议"));
        } else {
          callback()
        }
      };
      return {
        sex : '',
        show: true,
        count: '',
        timer: null,
        number:'0',
        ruleForm: {
          desc:'',
        },
        checked: true,
        codeShow : true,
        realNameDis : false,
        phoneDis : false,
        cardDis : false,
        photoUrlDis : false,
        userId : '',
        data:[],
        ruleForm: {
          checked: "",
          name: "",
          region: "",
          delivery: false,
          type: [],
          desc: "",
          realname: "",
          idnumber: "",
          phonenumber: "",
          code: "",
          IDimg:"",
        },
        rules: {
          name: [{
              required: true,
              message: "请输入主播名/歌手名",
              trigger: "blur"
            },
            {
              min: 1,
              max: 10,
              message: "长度在 1 到 10 个字符",
              trigger: "blur"
            }
          ],
          // idtype: [
          //   {
          //     type: "array",
          //     required: true,
          //     message: "请至少选择一个证件类型",
          //     trigger: "change"
          //   }
          // ],
          // desc: [{
          //   required: true,
          //   message: "请填写个人简介",
          //   trigger: "blur"
          // }],
          realname: [{
            required: true,
            message: "请填写真实姓名",
            trigger: "blur"
          },
          {
              min: 1,
              max: 10,
              message: "长度在 1 到 10 个字符",
              trigger: "blur"
            }
          ],
          // idnumber: [{
          //   required: true,
          //   message: "请填写身份证号码",
          //   trigger: "blur"
          // },
          //  {
          //     min: 13,
          //     max:13,
          //     message: "身份证号码错误",
          //     trigger: "blur"
          //   }
          // ],
          idnumber: [{
            required: true,
            validator: validateidnumber,
            trigger: 'blur'
          }],
          phonenumber: [{
            required: true,
            validator: validatephonenumber,
            trigger: 'blur'
          }],
          code: [{
            required: true,
            message: "请填写验证码",
            trigger: "blur"
          }],
           IDimg: [{
            required: true,
            validator: validateIDimg,
            trigger: 'blur'
          }],
            checked: [{ 
            required: true,
            validator: validateChecked,
            trigger: 'blur'
          }],
        }
      }
    },
    // 页面初始化
    mounted() {
      this.initPage();
    },
    methods: {
     childByValue: function (childValue) {
        // childValue就是子组件传过来的值
        this.sex = childValue;
      },
     initPage() {
       this.axios.get(this.common.projectName_ + 'auth/queryAuthInfo.action?')
                 .then((response) => {
                   var result=response.data;
                   var resultMessage = this.common.checkResult(result);
                   if (result.code == 0) {
                       var userId = result.data.userId;
                       if (userId != null) {
                          this.userId = userId;
                          this.$refs.upload.imageUrl = result.data.photoUrl;  // 获取头像
                          this.$refs.uploadZ.imageUrl = result.data.cardFrontUrl;  // 获取身份证正面
                          this.$refs.uploadF.imageUrl = result.data.cardReverseUrl;  // 获取身份证背面
                          this.$refs.uploadHAND.imageUrl = result.data.cardHandUrl;   // 获取身份证手持
                          if (result.data.sex == "男") {
                            this.$refs.radio.check(0); // 0是男 1是女
                          } else {
                            this.$refs.radio.check(1); // 0是男 1是女
                          }
                          this.ruleForm.name = result.data.anchorName;
                          this.ruleForm.desc = result.data.introduce;
                          this.ruleForm.realname = result.data.userName;
                          this.ruleForm.phonenumber = result.data.phone;
                          this.ruleForm.idnumber = result.data.cardNum;
                          var authStatus = result.data.authStatus;
                          $("#authStatus").val(authStatus);
                         if (authStatus == 2) {
                           this.$refs.uploadZ.cardFrontUrlDis = 'none';
                           this.$refs.uploadF.cardReverseUrlDis = 'none';
                           this.$refs.uploadHAND.cardHandUrlDis = 'none';
                           this.realNameDis = true;
                           this.phoneDis = true;
                           this.cardDis = true;
                           this.codeShow = false;
                         }
                       }
                    } else {
                      this.$message.error(resultMessage);
                    }
                 })
                 .catch(function (error) {
                   console.log(error)
                 }) 
      this.ruleForm = {
        name: "",
        region: "",
        desc: "",
        realname: "",
        idnumber: "",
        phonenumber: "",
        code: ""
      };
     },
      submitForm(formName) {
        // 获取头像
        var avatar = this.$refs.upload.imageUrl
        // 获取身份证正面
        var imgIDz = this.$refs.uploadZ.imageUrl
        // 获取身份证背面
        var imgIDf = this.$refs.uploadF.imageUrl
        // 获取手持身份证
        var imgIDhand = this.$refs.uploadHAND.imageUrl    
        this.$refs[formName].validate((valid) => {
        if (valid) {
          var params = new URLSearchParams();
          params.append('userId', this.userId);
          params.append('anchorName', this.ruleForm.name);
          params.append('photoUrl', avatar);
          params.append('sex', this.sex);
          params.append('introduce', this.ruleForm.desc);
          var authStatus = $("#authStatus").val();
          if (authStatus != 2) {
              params.append('userName', this.ruleForm.realname);
              params.append('cardNum', this.ruleForm.idnumber);
              params.append('phone',this.ruleForm.phonenumber);
              params.append('cardFrontUrl',imgIDz);
              params.append('cardReverseUrl',imgIDf);
              params.append('cardHandUrl',imgIDhand);
              params.append('code', this.ruleForm.code);
              params.append('authStatus', authStatus);
          }
          this.axios.post(this.common.projectName_ + 'auth/authSubmit.action?',params)
            .then((response) => {
              var result=response.data;
              //检查后台返回结果
              var resultMessage = this.common.checkResult(result);
              if (result.code == 0) {
                if (result.data == 2 ) {
                    this.$message.error(result.message);
                } else {
                    this.$router.push({path : resultMessage});
                }
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
      //点击获取验证码按钮先判断手机号是否为空
      validatePhone(val){
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          if (!reg.test(val)) {
             this.$message({
                    type: "error",
                    message: "请先输入手机号"
                  });
                  return true;
          }else{
            return false;
          }
      },
      getCode(){
           // 调用点击获取验证码的时候手机号是否为空
        if(this.validatePhone(this.ruleForm.phonenumber)){
          return;
        }
        this.axios.get(this.common.projectName_ + 'user/sendCode.action?',{
          params : {
            phone : this.ruleForm.phonenumber
          }
        })
        .then((response) => {
          var result=response.data;
          //检查后台返回结果
          var resultMessage = this.common.checkResult(result);
          if (result.code == 0) {
            if (result.data) {
              this.$message.info('短信下发成功');
            } 
          } else {
            this.$message.error(resultMessage);
          }
        })
        .catch(function (error) {
          console.log(error);
        })
        const TIME_COUNT = 60;
          if (!this.timer) {
            this.count = TIME_COUNT;
            this.show = false;
            this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) { 
              this.count--; 
            } else { 
              this.show=true; 
              clearInterval(this.timer);
              this.timer=null; 
            } 
          }, 1000) 
        } 
      },
     checkPhone (name,callback) {
        this.axios.get(this.common.projectName_ + 'auth/checkAuthPhone.action?',{
          params : {
            phone : this.ruleForm.phonenumber
          }
        })
        .then((response) => {
          var isValid;
          var result=response.data;
          //检查后台返回结果
          var resultMessage = this.common.checkResult(result);
          isValid = result.data;
          if (result.code != 0) {
            this.$message.error(resultMessage);
            isValid = false;
          }
          callback(isValid);
        })
        .catch(function(error) {
          console.log(error)
        })
      },
      checkCard (name,callback) {
        this.axios.get(this.common.projectName_ + 'auth/checkAuthCard.action?',{
          params : {
            card : this.ruleForm.idnumber
          }
        })
        .then((response) => {
          var isValid;
          var result=response.data;
          //检查后台返回结果
          var resultMessage = this.common.checkResult(result);
          isValid = result.data;
          if (result.code != 0) {
            this.$message.error(resultMessage);
            isValid = false;
          }
          callback(isValid);
        })
        .catch(function(error) {
          console.log(error)
        })
      }
    },
    //修改列表页的meta值，false时再次进入页面会重新请求数据。
    beforeRouteLeave(to, from, next) {
        from.meta.keepAlive = false;
        next();
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

<style>
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #3d4658;
    border-color: #3d4658;
    border-radius: 7px;
}
.el-checkbox__input.is-checked+.el-checkbox__label {
    color: #ED3636;
}
.el-checkbox__inner:hover {
    border-color: #3d4658;
}
.el-checkbox__input.is-focus .el-checkbox__inner{
   border-color: #3d4658;
}
.codeArea{
   display:flex;
}
.codeArea .getCodeBefore{
  width:100px;
  height: 38px;
  background:#ED3636;
  color:#fff;
  text-align: center;
  margin-left: 5px;
  border-radius: 5px;
  cursor: pointer;
}
</style>

<style lang="less" scoped>
  page {
    padding: 0;
    margin: 0;
    width: 100%;
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
  input[type=file]{
    display: none;
  }

  .sendC{
    width: 194px;
    height: 122px;
    margin-right: 20px;
    /deep/ .avatar-uploader-icon{
        width: 192px;
        height: 120px;
        line-height: 120px;
    }
    /deep/ .avatar{
      width: 192px;
      height: 120px;
      display: block;
    }
    .CText{
      color: #757575;
      font-size: 14px;
      text-align: center;
      margin-top: -5px;
    }
  }
  .cardrule{
    color: #BBBBBB;
    font-size: 12px;
    p{
      margin: 0;
      padding: 0;
      height: 19px;
    }
  }
  .el-button{
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
  .el-radio__input.is-checked .el-radio__inner{
    border-color: red!important;
    background: red!important;
  }
  .el-upload{
    width: 192px;
    .el-upload-dragger{
      width: 192px;
    }
  }

  .topBar {
    width: 100%;
    height: 61px;
    background-color: #3d4658;
    display: flex;
    justify-content: space-around;

    img {
      width: 137.1px;
      height: 46px;
      margin-top: 7.5px;
    }

    .topcontent {
      display: flex;

      .exit {
        color: #fff;
        font-size: 12px;
        margin-left: 11px;
        line-height: 61px;
      }

      a:hover {
        text-decoration: none;
        color: #ed3636;
      }
    }
  }

  .header {
    width: 100%;
    height: 119px;
    background-color: #f1f1f1;

    .content {
      width: 30%;
      text-align: center;
      margin: 0 auto;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      padding-top: 35px;

      span {
        width: 98%;
        height: 1px;
        background: #cdcdcd;
        margin-top: 17px;
      }

      .left {
        p {
          color: #ed3636;
          margin: 0;
          width: 56px;
        }
      }

      .right {
        p {
          color: #999999;
          margin: 0;
          width: 56px;
        }
      }
    }
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

    .name {
      width: 100%;
      display: flex;
      margin-top: 30px;

      p {
        font-size: 14px;
        margin-left: 10px;
        margin-right: 20px;
        width: 91px;
        padding-top: 9px;
      }

      .inputname {
        width: 423px;
        height: 38px;
        border: 1px solid #cdcdcd;

        input {
          border: none;
          width: 100%;
          height: 100%;
          font-size: 14px;
          color: #757575;
          padding-left: 14px;
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