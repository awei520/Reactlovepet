import { Carousel, WingBlank } from 'antd-mobile';
import React from 'react'
import './Rcarousel.css'
class Rcarousel extends React.Component {
  state = {
    data: ['http://p2.ycw.com/201809/13/52677dbed80e32bfa90c63f55b18566a_s300', 'http://p2.ycw.com/201809/20/b1a160bc05b0f60f64b9098439338010_s300', 'http://p2.ycw.com/201810/01/ca864ee04e7b7d8e69134a2a0cafbaf8_s300','http://p2.ycw.com/201906/22/7a87f277c022461e065f807d390bde4e_s300'],
    imgHeight: 176,
  }
  componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: ['http://p2.ycw.com/201809/13/52677dbed80e32bfa90c63f55b18566a_s300', 'http://p2.ycw.com/201809/20/b1a160bc05b0f60f64b9098439338010_s300', 'http://p2.ycw.com/201810/01/ca864ee04e7b7d8e69134a2a0cafbaf8_s300','http://p2.ycw.com/201906/22/7a87f277c022461e065f807d390bde4e_s300'],
      });
    }, 100);
  }
  render() {
    return (
      <WingBlank>
        <Carousel className="space-carousel"
          frameOverflow="visible"
          cellSpacing={10}
          slideWidth={0.8}
          autoplay
          infinite
          beforeChange={(from, to) => {return}}
          afterChange={index => this.setState({ slideIndex: index })}
        >
          {this.state.data.map((val, index) => (
            <a
              key={val}              
              style={{
                display: 'block',
                position: 'relative',
                top: this.state.slideIndex === index ? -10 : 0,
                height: this.state.imgHeight,
                boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
              }}
            >
              <img
                src={`${val}`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
      </WingBlank>
    );
  }
}
export default Rcarousel