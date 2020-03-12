<template>
  <div>
    <button type="primary" @click="handleClick">Message按钮</button>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    methods: {
      handleClick () {
        this.$message({
          type: 'info',
          title: '提示',
          message: '三国演义',
          showFooter: true,
          confirmText: '取消',
          cancelText: '确定',
          confirmStyle: true,
          cancelStyle: true
        }).then(() => {
          console.log(1111)
        }, () => {
          console.log(2222)
        })
      }
    }
  }
</script>