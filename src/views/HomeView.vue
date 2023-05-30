<template>
    <div>
        <div class="search_panel">
            <el-input placeholder="请输入内容" v-model="userInput" class="input-with-select" @input="searchResult=[]">
                <el-select v-model="userSelected" slot="append" placeholder="请选择">
                    <el-option v-for="item in supportedDomainList" :label="'.'+item" :value="'.'+item" :key="item"></el-option>
                </el-select>
                <i class="el-icon-search" slot="append" type="primary" @click="searchHandler" style="padding-top: 10px;cursor: pointer"></i>
            </el-input>
        </div>
        <div>
            <ul class="search-ul-list" v-if="searchResult.length>0">
                <li v-for="(item) in searchResult" :key="item">
                    <span>{{ item }}</span>
                    <span @click="registClickHandler(item)"><i class="el-icon-shopping-cart-full">申请</i></span>
                </li>
            </ul>
        </div>
        <el-dialog title="域名注册" :visible.sync="dialogFormVisible">
            <el-form :model="registInfo" :inline="true">
                <b>
                <el-form-item label="域名" :label-width="formLabelWidth">
                    <el-input style="font-weight: bold" v-model="registInfo.domain" autocomplete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="A记录" :label-width="formLabelWidth">
                    <el-ip-input v-model="registInfo.ipv4" autocomplete="off" placeholder="请填写ipv4地址"></el-ip-input>
                </el-form-item>
                </b>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitRegisterHandler">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>

import {searchDomains, registerDomain, fetchSupported} from "@/api";

export default {
    name: 'HomeView',
    data() {
        return {
            registInfo: {
                domain: "",
                ipv4: ""
            },
            supportedDomainList:[],
            formLabelWidth: "80px",
            dialogFormVisible: false,
            userInput: '',
            userSelected: '',
            searchResult: []
        }
    },
    mounted() {
        fetchSupported().then(resp=>{
            this.supportedDomainList=resp.data
            console.log(resp.data)
        })
    },
    methods: {
        registClickHandler(domain) {
            this.registInfo.domain = domain
            this.dialogFormVisible = true
        },
        submitRegisterHandler(){
            registerDomain(this.registInfo).then(resp=>{
                if(resp.code==200){
                    this.$message({message:'恭喜你，注册成功',type: 'success'});
                }
                this.dialogFormVisible = false
                this.searchResult=[]
            })
        },
        searchHandler() {
            if(this.userInput==""){
                this.$alert('请输入您想要注册的域名后再查询', '查询提示', {
                    confirmButtonText: '确定'
                });
                return
            }
            searchDomains(this.userInput,this.userSelected).then(resp => {
                if(resp.data==null){
                    this.$alert('很抱歉,您输入的域名已被别人注册，请换一个', '结果提示', {
                        confirmButtonText: '确定'
                    });
                }else{
                    this.searchResult = resp.data
                }
            })
        }
    }

}
</script>
<style>
.search_panel {
    text-align: center;
    padding: 7%;
}

.search_panel .el-select {
    width: 120px;
    color: steelblue !important;
}

.search_panel .el-input__inner {
    height: 60px !important;
}

.search_panel .el-icon-search {
    color: steelblue !important;
    font-size: 24px;
    margin-left: 30px;
}

.search_panel .input-with-select {
    width: 50% !important;
    font-size: 18px;
}

.search-ul-list {
    list-style: none;
    line-height: 40px;
    font-size: 20px;
    color: #333;
    font-weight: bold;
    font-stretch: expanded;
}

.search-ul-list li span {
    display: inline-block;
    padding-right: 20px;
    min-width: 220px;
    text-align: right;
}

.el-icon-shopping-cart-full {
    color: #42b983;
    cursor: pointer;
}

.el-icon-shopping-cart-full:hover {
    color: #222222;
    cursor: pointer;

}
</style>
