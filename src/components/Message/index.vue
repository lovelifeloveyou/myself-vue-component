<template>
  <transition name="el-message-fade">
    <div
      :class="[
        'el-message-info',
        'my-message',
        type && !iconClass ? `el-message--${ type }` : '',
        center ? 'is-center' : '',
        showClose ? 'is-closable' : '',
        customClass
      ]"
      v-bind:style="{'min-height': showFooter ? '150px':'111px'}"
      v-show="visible"
      role="alert"
      @click="clickHandler"
    >
      <div class="message_close"><i class="el-icon-close" /></div>
      <div class="titleStyle" style="text-align: center;margin-left: 5px;" v-bind:style="{'margin-top': showFooter ? '-30px' : '0px'}">
        <slot>
          <div class="el-message__content">
            <div class="titleHead">
              <!-- <img class="message_ico" :src="ico" /> -->
              <i class="iconfont am-icon-_wenxintishi" v-if="type === 'error' || type === 'warning'" />
              <i class="iconfont am-icon-wanchengshenhe" v-if="type === 'success' || type === 'info'" />
              <p class="content_title">{{ title }}</p>
            </div>
            <div v-if="!dangerouslyUseHTMLString" class="titlecontent">
              <p class="content_msg"  style="color: #000000; font-size: 16px;margin-left: 20px; word-break:break-all">{{ message }}</p>
            </div>
            <div v-else v-html="message" class="el-message_content"></div>
          </div>
          <!-- <div v-else v-html="message" class="el-message_content"></div> -->
        </slot>
      </div>
      <div class="message_footer" v-show="showFooter">
        <div :class="[confirmStyle ? 'jump confirmStyle' : 'jump']" @click="cancel">{{ confirmText }}</div>
        <div :class="[cancelStyle ? 'confirm cancelStyle' : 'confirm']" @click="ok">{{ cancelText }}</div>
      </div>
      <i v-if="showClose" class="el-message__closeBtn el-icon-close" @click="close"></i>
    </div>
  </transition>
</template>

<script type="text/babel">
const typeMap = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error'
};
var titleMap = {}
if (localStorage.yz_accept_language === 'zh-hans') {
  titleMap = {
    success: '成功!',
    info: '通知!',
    warning: '警告!',
    error: '错误!'
  }
} else if (localStorage.yz_accept_language === 'en') {
  titleMap = {
    success: 'success',
    info: 'info',
    warning: 'warning',
    error: 'error'
  }
} else if (localStorage.yz_accept_language === 'pt') {
  titleMap = {
    success: 'triunfo', // '成功!',
    info: 'informação', // '通知!',
    warning: 'rebate', // '警告!',
    error: 'erro' // '錯誤!'
  }
} else {
  titleMap = {
    success: '成功!',
    info: '通知!',
    warning: '警告!',
    error: '錯誤!'
  }
}
const typeIco = {
  success: require('./ico/success.png'),
  info: require('./ico/info.png'),
  warning: require('./ico/warning.png'),
  error: require('./ico/error.png')
}

export default {
  data() {
    return {
      visible: false,
      message: '',
      title: '',
      duration: 3000,
      type: 'info',
      ico: typeIco['info'],
      iconClass: '',
      customClass: '',
      onClose: null,
      showClose: false,
      closed: false,
      timer: null,
      dangerouslyUseHTMLString: false,
      center: false,
      resolve: '',
      reject: '',
      promise: '',
      showFooter: false,
      confirmText: '',
      cancelText: '',
      confirmStyle: false,
      cancelStyle: false
    };
  },

  computed: {
    typeClass() {
      return this.type && !this.iconClass
        ? `el-message__icon el-icon-${typeMap[this.type]}`
        : '';
    }
  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false;
        this.$el.addEventListener('transitionend', this.destroyElement);
      }
    }
  },
  methods: {
    showMessage: function () {
      this.visible = true
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
      return this.promise
    },
    destroyElement() {
      this.$el.removeEventListener('transitionend', this.destroyElement);
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
      this.resolve && this.resolve()
    },
    close() {
      this.closed = true;
      if (typeof this.onClose === 'function') {
        this.onClose(this);
        this.reject(false)
      }
    },
    clickHandler () {
      this.clearTimer()
      this.close();
    },
    clearTimer() {
      clearTimeout(this.timer);
    },
    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close();
          }
        }, this.duration);
      }
    },
    cancel () {
      this.visible = false
      this.reject(false)
      this.clearTimer()
      this.close()
    },
    ok () {
      this.visible = false
      this.resolve(true)
      this.clearTimer()
      this.close()
    }
  },
  mounted() {
    this.ico = typeIco[this.type]
    this.title = this.title || titleMap[this.type]
    this.startTimer()
  }
};
</script>

<style lang="less">
  .my-message, .el-message-info {
    user-select: none;
    min-width: 300px;
    max-width: 500px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 5px;
    border-color: #ebeef5 !important;
    position: fixed;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background-color: #fff !important;
    -webkit-transition: opacity 0.3s, -webkit-transform 0.4s;
    transition: opacity 0.3s, -webkit-transform 0.4s;
    transition: opacity 0.3s, transform 0.4s;
    transition: opacity 0.3s, transform 0.4s, -webkit-transform 0.4s;
    overflow: hidden;
    padding-right: 25px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    box-shadow: 0px 2px 10px rgba(115,115,115,0.21);

    .am-icon-_wenxintishi:before {
      // content: "\E620";
      font-size: 22px;
      color: red;
      margin-right: 10px;
    }
    .am-icon-wanchengshenhe:before {
      content: "\E6A7";
      color: #23bb00;
      font-size: 22px;
      margin-right: 10px;
    }

    .titleStyle {
      .titleHead {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        .message_ico{
          width: 22px;
          height: 22px;
          margin-right: 10px;
        }
        .content_title {
          font-size: 19px;
          margin-top: 16px;
        }
      }

      .titlecontent {
        // padding-top: 25px;
        // margin-left: 15px;
      }
    }

  .message_footer {
    position: absolute;
    height: 40px;
    margin-left: 12px;
    background-color: #fff;
    bottom: 0;
    width: 100%;
    display: flex;
    border-top: 1px solid rgba(218,218, 218, 0.4);
    border-left: none;
    border-right: none;
    border-bottom: none;
    font-size: 16px;
    line-height: 40px;
    cursor: pointer;

    .jump {
      flex: 1;
      text-align: center;
      border-right: 1px solid rgba(218, 218, 218, 0.4);
      color: #e8e8e8;
      &:hover {
        color: #008377;
      }
    }
    .confirmStyle {
      color: #009688 !important;
    }
    .confirm {
      flex: 1;
      text-align: center;
      color: #009688;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
    .cancelStyle {
      color: red !important;
    }
  }
  }

  .my-message.el-message--success {
    .el-message__content {
      .content_title{
        color: #3EBA6D;
      }
    }
  }
  .my-message.el-message--warning {
    background-color: white;
    .el-message__content {
      color: black;

      .content_title{
        color: #F77120;
      }
    }
  }
  .my-message.el-message--error {
    .el-message__content {
      .content_title{
        color: red;
      }
    }
  }
  .my-message.el-message-fade-enter,
  .my-message.el-message-fade-leave-active {
    opacity: 0;
    -webkit-transform: translate(-50%, -100%);
    transform: translate(-50%, -100%);
  }

  .my-message{
    .message_close{
      width: 22px;
      height: 22px;
      border-radius: 22px;
      background-color: #ffffff;
      color: #e8e8e8;
      position: absolute;
      top: 6px;
      right: 6px;
      text-align: center;
      cursor: pointer;
      .el-icon-close{
        font-size: 18px;
        margin-top: 2px;
      }
      &:hover{
        background-color: #e8e8e8;
        color: #ffffff;
      }
    }
  }
</style>
