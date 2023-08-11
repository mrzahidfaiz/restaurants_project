import { Carousel } from 'antd';



const contentStyle = {
  height: '650px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  width: '100%',
  background: '#364d79',
};
const Slider = () => (
    <div className='lg:px-60 px-6 my-4'>
  <Carousel autoplay>
    <div>
      <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60" alt="slide1" style={contentStyle}/>
    </div>
    <div>
    <img src="https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" alt="slide2" style={contentStyle}/>
    </div>
    <div>
    <img src="https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" alt="slide2" style={contentStyle}/>
    </div>
    <div>
    <img src="https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" alt="slide2" style={contentStyle}/>
    </div>
  </Carousel>
  </div>
);
export default Slider;