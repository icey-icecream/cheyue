<template>
    <div class="dialog" v-show="showMask">
        <div class="dialog-container">
            <div class="dialog-title">{{title}}</div>
            <div class="btns">
                <div v-if="type != 'confirm'" class="default-btn" @click="closeBtn">
                    {{cancelText}}
                </div>
                <div v-if="type == 'danger'" class="danger-btn" @click="dangerBtn">
                    {{dangerText}}
                </div>
            </div>
        </div>       
    </div>
</template>
<script>
export default {
    props: {
        value: {},
        // 类型包括 defalut 默认， danger删除
        type:{
            type: String,
            default: 'default'
        },
        content: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        dangerText: {
            type: String,
            default: '删除'
        }
    },
    data(){
        return{
            showMask: false,
        }
    },
    methods:{
        closeMask(){
            this.showMask = false;
        },
        closeBtn(){
            this.$emit('cancel');
            this.closeMask();
        },
        dangerBtn(){
            this.$emit('danger');
            this.closeMask();
        }
    },
    mounted(){
        this.showMask = this.value;
    },
    watch:{
        value(newVal, oldVal){
            this.showMask = newVal;
        },
        showMask(val) {
            this.$emit('input', val);
        }
    },
}
</script>
<style lang="less" scoped>
    .dialog{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: 9999;
        .dialog-container{
            width: 250px;
            height: 112px;
            background: #ffffff;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            position: relative;
            border: 1px solid #3D4658;
            .dialog-title{
                width: 100%;
                height: 60px;
                font-size: 14px;
                color: #3D4658;
                text-align: center;
                box-sizing: border-box;
                padding-top: 27px;
            }
            .btns{
                width: 100%;
                height: 60px;
                position: absolute;
                bottom: 0;
                left: 0;
                text-align: center;
                padding: 0 16px;
                box-sizing: border-box;
                display: flex;
                justify-content: space-around;
                top: 63px;
                & > div{
                    display: inline-block;
                    height: 30px;
                    width: 80px;
                    line-height: 30px;
                    padding: 0 14px;
                    color: #ffffff;
                    background: #f1f1f1;
                    border: 1px solid #3D4658;
                    cursor: pointer;
                }
                .default-btn{
                    color: #fff;
                    background-color: #3D4658;
                }
                .danger-btn{
                    background-color: #fff;
                    color: #3D4658;
                }
            }
        }
    }
</style>