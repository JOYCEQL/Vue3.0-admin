<!--
 * @Author: yuguangzhou
 * @Date: 2021-04-22 14:36:07
 * @LastEditTime: 2021-05-06 14:57:41
 * @LastEditors: yuguangzhou
 * @Description: 轮播图配置
-->
<template>
  <div class="Swiper">
    <a-card title="轮播图配置"  class="swiper-card">
      <template #extra>
        <a-button type="primary" style="margin-right: 10px" @click="addCarousel"> <PlusOutlined />添加</a-button>
        <a-button type="danger" @click="delMuti"><MinusOutlined />删除</a-button>
      </template>
      <a-table rowKey="carouselId" :data-source="tableData" @change="handleTableChange" :pagination="pagination"  :columns="columns" :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
        <template #carouselUrl="{ record }">
          <!-- {{ record }} -->
          <a-image :width="100" :src="record.carouselUrl" />
          <!-- <img :src="record.carouselUrl" style="width: 150px; height: 120px" alt="" /> -->
        </template>
        <template #action="{ record }">
          <a @click="updateDarousel(record.carouselId)">修改</a>
          <a style="color: red; margin-left: 20px" @click="delDarousel(record)">删除</a>
        </template>
        <template #redirectUrl="{ text }">
          <a target="_blank" :href="text">{{ text }}</a>
        </template>
      </a-table>
    </a-card>
    <SwiperModal :visible="modalVisible" :title="modalTitle" @modalAction="modalCallback" @modalCancel="modalCancelCallback" >
      <a-spin :spinning="spinning">
        <a-form :model="formState" :label-col="{ span: 4 }" :rules="rules" :wrapper-col="{ span: 14 }" ref="swiperForm">
          <a-form-item label="图片" name="imageUrl">
            <a-upload
              v-model:file-list="fileList"
              list-type="picture-card"
              :headers="{
                token: token,
              }"
              :show-upload-list="false"
              :action="uploadImgServer"
              :before-upload="beforeUpload"
              @change="handleChange"
              @preview="handlePreview"
            >
              <img style="width: 100%" v-if="formState.imageUrl" :src="formState.imageUrl" alt="file" />
              <div v-else>
                <loading-outlined v-if="loading"></loading-outlined>
                <plus-outlined v-else></plus-outlined>
              </div>
            </a-upload>
          </a-form-item>
          <a-form-item label="跳转链接">
            <a-input v-model:value="formState.link" />
          </a-form-item>
          <a-form-item label="排序值" name="sort">
            <a-input-number id="inputNumber" v-model:value="formState.sort" style="width: 100%" :min="1" />
          </a-form-item>
        </a-form>
      </a-spin>
    </SwiperModal>
  </div>
</template>

<script>
import { reactive, ref, toRefs, onMounted, createVNode } from "vue";
import { getCarouselsAjax, uploadImgServer, addCarouselsAjax, delCarouselAjax,getCarouselInfoAjax,updateCarouselsAjax} from "@/api/home";
import { PlusOutlined, MinusOutlined, LoadingOutlined, ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { getToken } from "@/utils/token";
import { getBase64 } from "@/utils/base64";
import SwiperModal from "@/components/Modal.vue";
import { message, Modal } from "ant-design-vue";
export default {
  name: "Swiper",
  components: {
    PlusOutlined,
    MinusOutlined,
    SwiperModal,
    LoadingOutlined,
  },
  setup() {
    const swiperForm = ref();
    const state = reactive({
      modalKey:'',
      type:'',
      activeId:'',
      spinning: false,
      uploadImgServer,
      loading: false,
      token: getToken("token"),
      modalVisible: false,
      fileList: [],
      modalTitle: "",
      tableData: [],
      pagination:{
        pageNumber: 1,
        pageSize: 10,
        total:0
      },
      selectedRowKeys: [],
      tableSet: {
        pageNumber: 1,
        pageSize: 10,
      },
      columns: [
        {
          title: "轮播图",
          dataIndex: "carouselUrl",
          key: "CarouselUrl",
          slots: {
            customRender: "carouselUrl",
          },
        },
        {
          title: "跳转链接",
          dataIndex: "redirectUrl",
          key: "RedirectUrl",
          slots: {
            customRender: "redirectUrl",
          },
        },
        {
          title: "排序值",
          dataIndex: "carouselRank",
          key: "CarouselRank",
        },
        {
          title: "添加时间",
          dataIndex: "createTime",
          key: "CreateTime",
        },
        {
          title: "操作",
          key: "Operation",
          width: 130,
          slots: { customRender: "action" },
        },
      ],
      formState: {
        link: "",
        sort: "",
        imageUrl: "",
      },
    });
    onMounted(() => {
      getCarousels();
    });
    const getCarousels = async () => {
      const res = await getCarouselsAjax(state.pagination);
      console.log(res);
      const { list,totalCount} = res;
      state.tableData = list;
      state.pagination.total=totalCount
    };
    const onSelectChange = (selectedRowKeys) => {
      state.selectedRowKeys = selectedRowKeys;
    };
    const addCarousel = () => {
      state.type='add'
      state.modalTitle = "添加轮播图";
      state.spinning = false;
      state.modalVisible = true;
      // 注意重置表单和显示Dom的顺序
      // swiperForm.value.resetFields();
      state.formState.imageUrl=''
      state.formState.link=''
      state.formState.sort=''
    };
    const updateDarousel =async (id) => {
      state.activeId=id
      state.spinning = false;
      state.modalTitle = "修改轮播图";
      state.modalVisible = true;
      const res=await getCarouselInfoAjax(id)
      state.formState.imageUrl=res.carouselUrl
      state.formState.link=res.redirectUrl
      state.formState.sort=res.carouselRank
    };
    const modalCallback = () => {
      swiperForm.value
        .validate()
        .then(() => {
          handleSubmit();
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const handleSubmit = async () => {
      state.spinning = true;
      let data = {
        carouselUrl: state.formState.imageUrl,
        redirectUrl: state.formState.link,
        carouselRank: state.formState.sort,
      };
      if(state.type==='add'){
          const res = await addCarouselsAjax(data);
          state.spinning = false;
          message.success("添加成功");
      }else{
          data.carouselId=state.activeId
          const res = await updateCarouselsAjax(data);
          state.spinning = false;
          message.success("修改成功");
          delete data.carouselId
      }
      getCarousels();
      state.modalVisible = false;
    };
    const modalCancelCallback = () => {
      state.modalVisible = false;
      state.type=''
    };
    const handleChange = (info) => {
      if (info.file.status === "uploading") {
        state.loading = true;
        return;
      }
      if (info.file.status === "done") {
        state.formState.imageUrl = info.file.response.data;
        state.loading = false;

        // Get this url from response in real world.
        // getBase64(info.file.originFileObj, (base64Url) => {
        //   // state.formState.imageUrl = base64Url;
        // });
      }
      if (info.file.status === "error") {
        state.loading = false;
        // message.error("upload error");
      }
    };
    const handleTableChange=(pagination)=>{
      console.log(pagination);
      state.pagination.pageNumber=pagination.current
      state.pagination.pageSize=pagination.pageSize
      getCarousels();
    }
    const beforeUpload = (file) => {};
    const handlePreview = () => {};
    // 声明sort的值type为number,否则会报错
    const rules = {
      imageUrl: [{ required: true, message: "图片不能为空", trigger: "change" }],
      sort: [{ required: true, message: "排序号不能为空", trigger: "blur", type: "number" }],
    };

    const delDarousel = ({ carouselId }) => {
      Modal.confirm({
        title: "提示",
        icon: createVNode(ExclamationCircleOutlined),
        content: "确定要删除吗",
        okText: "确认",
        cancelText: "取消",
        centered: true,
        async onOk() {
          const res = await delCarouselAjax([carouselId]);
          message.success("删除成功");
          // if (res.resultCode == 200) message.success("删除成功");
          getCarousels();
        },
      });
    };
    const delMuti = () => {
      let ids = state.selectedRowKeys;
      if (ids.length == 0) {
        message.error("请选择需要删除的项");
        return;
      }
      Modal.confirm({
        title: "提示",
        icon: createVNode(ExclamationCircleOutlined),
        content: "确定要删除吗",
        okText: "确认",
        cancelText: "取消",
        centered: true,
        async onOk() {
          const res = await delCarouselAjax(ids);
          message.success("删除成功");
          // if (res.resultCode == 200) message.success("删除成功");
          getCarousels();
        },
      });
    };
    return {
      ...toRefs(state),
      getCarousels,
      onSelectChange,
      addCarousel,
      updateDarousel,
      modalCallback,
      modalCancelCallback,
      beforeUpload,
      handleChange,
      getBase64,
      handlePreview,
      rules,
      swiperForm,
      delDarousel,
      delMuti,
      handleTableChange
    };
  },
};
</script>

<style lang="less" scoped>
</style>
