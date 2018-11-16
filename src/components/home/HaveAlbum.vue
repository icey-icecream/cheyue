<template>
  <div>
     <!-- 顶部导航栏区域 -->
    <div class="Hometop">
       <topbar></topbar>
    </div>
    <div class="main">
       <div class="header">
         <div></div>
        <div class="buildAlbum" @click="buildAlbum()">创建专辑</div>
       </div>
      <div class="programTable">
        <table>
          <thead>
            <tr>
              <th>序号</th>
              <th>专辑名称</th>
              <th>最新上传节目名称</th>
              <th>已有节目数量</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in list" :key="index">
              <td>{{ index+1 }}</td>
              <td v-text=" item.albumName"></td>
              <td>{{ item.latestProgramName }}</td>
              <td>{{ item.publishProgramNum }}</td>
              <td>
                <router-link :to="{name:'editAlbum',params:{id:item.id}}">编辑</router-link>
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
          :page-size="pageSize"
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
        pageSize: 10,
        //查询的页码
        start: 1,
        //默认数据总数
        totalCount: 100,
        pageNum:1,
        // id: '',
        // albumName: '',
        // programName: '',
        // singer: '',
        // state: '',
        list: [],
      }
    },
     mounted(){
      this.loadData(this.pageNum, this.pageSize);
    },
    methods: {
      buildAlbum() {
        this.$router.push({
          path: '/buildAlbum'
        })
      },
      selected: function (programState) {
          this.activeName = programState
      },
       handleSizeChange(val) {
        this.pageSize = val;
        this.loadData(this.pageNum, this.pageSize);
      },
      handleCurrentChange(val) {
        this.pageNum = val;
        this.loadData(this.pageNum, this.pageSize);
      },
       //从服务器读取数据
      loadData: function(pageNum, pageSize){
        this.axios.get(this.common.projectName_ + 'album/listAlbumForPage.action?',
                      {
                        params : {
                          pageNum : pageNum,
                          pageSize : pageSize
                        }
                      })
                 .then((response) => {
                   var result=response.data;
                  //检查后台返回结果
                  var resultMessage = this.common.checkResult(result);
                  if (result.code == 0) {
                      console.log(result.data);
                      this.list = result.data.list;//数据
                      this.totalCount = result.data.total;//总数
                  } else {
                    this.$message.error(resultMessage);
                  }
                 })
                 .catch(function (error) {
                   console.log(error)
                 });
    }
    },
  };
</script>

<style lang="less" scoped>
  .Hometop /deep/ .nav a:nth-child(3){
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
      width: 100%;
      margin-bottom: 34px;
      display: flex;
      justify-content: space-between;
      .buildAlbum {
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