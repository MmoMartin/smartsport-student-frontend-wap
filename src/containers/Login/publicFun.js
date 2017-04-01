export function sendsucc() {
	const {count} = this.state;

    let second = 60;
    this.setState({count: `${second} 秒`});
    this.interval = setInterval(()=>{
      --second;
      if (second < 1) {
        this.setState({count: '获取验证码'});
        clearInterval(this.interval);
      } else {
        this.setState({count: `${second} 秒`});
      }
    }, 1000);
}

// 限制input输入长度，传入参数len
export function handleText(len, event) {
  if (event.target.value.length > len) {
    event.target.value = event.target.value.slice(0, len);
  }
}