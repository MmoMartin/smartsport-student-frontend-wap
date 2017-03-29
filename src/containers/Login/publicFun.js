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