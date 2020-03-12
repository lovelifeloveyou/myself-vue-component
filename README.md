# A Simple Message Tip Component for Vue.js

## Installation
```
npm i -S @superqjq/message
```

## Usage
In `main.js` of a Vue Project:
```javascript
import message from '@superqjq/toast';
Vue.use(message);
```

In any Vue component, you can simply use `this.$message()` to popup a tip:
```javascript
<script>
export default {
  mounted() {
    this.$message({
      type: 'info',
      title: '提示',
      message: '三国演义'
    });

    // or 
    this.$message.error('重生')
  }
}
</script>
```

## Options and Defaults
### type
*string*  
Default value is `success`.  
Type of message, could be one of these values: `success` | `warning` | `error` | `info`.

### title
*string*  
The info you want to show on the message title. (should be short)

### message
*string*
The info you want to show on the message.

### duration
*number*  
Default value is `3`.  
How many seconds he message should be shown, after that it could disapear automaticly.  
Specially, you can set a value of `-1`, which means showing the message forever.

### showFooter
*Boolean*  
Default value is `false`.  
Whether to display asynchronous execution buttons

### confirmText  cancelText
*string*  
Text prompt

### confirmStyle cancelStyle
*Boolean*
Default value is `false`
Button color

## Example
```javascript
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
    /* dosomething */
  }, () => {
    console.log(2222)
    /* dosomething */
  })
```
