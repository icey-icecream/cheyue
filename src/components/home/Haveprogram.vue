<template>
  <div>
     <!-- 顶部导航栏区域 -->
    <div class="Hometop">
       <topbar></topbar>
    </div>
    <div class="main">
      <div class="header">
        <div class="releaseStatus">
          <div class="chooseStatus">
            <p v-for="programState in programStates" class="aa" :class="{active: activeName == programState}" @click="selected(programState)" v-bind:key>{{programState}}</p>
          </div>
        </div>
        <div class="sendprogram" @click="sendprogram()">发布节目</div>
      </div>
      <div class="programTable">
        <table>
          <thead>
            <tr>
              <th>序号</th>
              <th>专辑名称</th>
              <th>节目名称</th>
              <th>主播</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in list" :key="index">
              <td>{{ index + 1 }}</td>
              <td v-text=" item.albumName"></td>
              <td>{{ item.programName }}</td>
              <td>{{ item.anchorName }}</td>
              <td>{{ item.programStatus }}</td>
              <td>
                <router-link :to="{name:'editProgram',params:{id:item.id}}">编辑</router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import topbar from '../subcomponents/topbar.vue'
  export default {
    //通过props来接受从父组件传递过来的值
    components:{
      'topbar': topbar,
    },
    data() {
      return {
        //当前页码
        currentPage: 1,
        //默认每页数据量
        pagesize: 10,
        //查询的页码
        start: 1,
        pageNum:1,
        //默认数据总数
        totalCount: 100,
        programStates: ['全部', '已发布', '审核中', '审核未通过'],
        activeName: '全部',
        list: [],
      };

    },
    mounted(){
      this.doQuery ();
    },
    methods: {
      sendprogram() {
        this.$router.push({
          path: '/sendprogram'
        })
      },
      selected: function (programState) {
          this.activeName = programState;
          this.doQuery ();
      },
      handleSizeChange(val) {
        this.pagesize = val;
        this.doQuery ();
      },
      handleCurrentChange(val) {
        this.pageNum = val;
        this.doQuery ();
      },
       //从服务器读取数据
      loadData: function(pageNum,pageSize,programStatus){
       this.axios.get(this.common.projectName_ + 'program/listProgramForPage.action?',
                      {
                        params : {
                          pageNum : pageNum,
                          pageSize : pageSize,
                          programStatus : programStatus
                        }
                      })
                 .then((response) => {
                   var result=response.data;
                  //检查后台返回结果
                  var resultMessage = this.common.checkResult(result);
                  if (result.code == 0) {
                      this.list = result.data.list;//数据
                      console.log(this.list);
                      this.totalCount = result.data.total;//总数
                  } else {
                    this.$message.error(resultMessage);
                  }
                 })
                 .catch(function (error) {
                   console.log(error)
                 });
        },
        doQuery () {
          var programStatus;
          if (this.activeName == '已发布') {
              programStatus = 2;
          } else if (this.activeName == '审核未通过') {
              programStatus = 1;
          } else if (this.activeName == '审核中') {
              programStatus = 0;
          } else {
              programStatus = -1; 
          }
          this.loadData(this.pageNum, this.pagesize, programStatus);
        }
    },
  };
</script>

<style lang="less" scoped>
  .Hometop /deep/ .nav a:nth-child(1){
    background-color: #ED3636;
  }
  .el-pagination {
    margin-top: 10px;
    float: right;
    white-space: nowrap;
    padding: 2px 5px;
    color: #303133;
    font-weight: 700;
  }
  .main {
    width: 51.6%;
    height: 500px;
    margin: 83px auto;

    .header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 34px;

      .releaseStatus {
        .chooseStatus {
          width: 423px;
          height: 38px;
          border: 1px solid #CDCDCD;
          display: flex;

          p {
            width: 106px;
            line-height: 38px;
            text-align: center;
            border-right: 1px solid #CDCDCD;
            height: 38PX;
            font-size: 14px;
          }

          P:last-child {
            border-right: none;
          }

          .active {
            color: #fff;
            background-color: #3D4658;
          }
        }
      }

      .sendprogram {
        width: 100px;
        text-align: center;
        line-height: 38px;
        border: 1px solid #3D4658;
        color: #3D4658;
        font-size: 14px;
      }
    }

    .programTable {
      width: 100%;
      text-align: center;

      table {
        text-align: center;
        line-height: 38px;

        thead {
          th {
            text-align: center;
            border: 1px solid #CDCDCD;
            background: #F2F2F2;
          }

          th:first-child {
            width: 106px;
          }

          th:nth-child(2) {
            width: 200px;
          }

          th:nth-child(3) {
            width: 300px;
          }

          th:nth-child(4) {
            width: 172px;
          }

          th:nth-child(5) {
            width: 106px;
          }

          th:last-child {
            width: 106px;
          }
        }

        tbody {
          td {
            border: 1px solid #CDCDCD;

            a {
              color: #0046FF;
              font-size: 14px;
            }

            a:hover {
              text-decoration: none;
            }
          }
        }
      }
    }

  }
</style>