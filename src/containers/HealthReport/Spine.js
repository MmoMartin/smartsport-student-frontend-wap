// 脊柱功能评估报告
import React, {Component, PropTypes} from 'react';
import { NavBar, Icon, Accordion, List } from 'antd-mobile';
import { formatDate } from 'xunyijia-components/src/utils/tool';
const LeftImg = require('img/return@2x.png');
const BaogImg = require('img/baogao@2X.png');
const styles = require('./HealthReport.scss');

export default class Spine extends Component {
  render() {
    const { SpineData } = this.props;
    let SpineMorphology = ''; // 存储脊柱形态的建议
    switch (SpineData.data.spinalShape) {
      case '正常背':
        SpineMorphology = '你的脊柱形态正常，请注意保持';
        break;
      case '腰椎前凸':
        SpineMorphology = '你的脊柱形态为腰椎前凸，请通过锻炼矫正。';
        break;
      case '驼背趋势':
        SpineMorphology = '你的脊柱形态为驼背趋势，可以通过矫形支具、康复训练等保守手段矫正。';
        break;
      case '直背趋势':
        SpineMorphology = '你的脊柱形态为直背趋势，可能会导致胸腔异常或者腰椎结构改变，引起心脏杂音或腰部酸痛等不适症状请通过背部力量训练矫正。';
        break;
      case '鞍背趋势':
        SpineMorphology = '你的脊柱形态为鞍背趋势，以通过矫形支具、康复训练等保守手段矫正。';
        break;
      default:
        break;
    }
    return (
      <div className={styles.report}>
        <div className='clearfix'
             style={{
               lineHeight: '0.6rem',
               color: '#6b6b6b',
               padding: '0 0.3rem',
               fontSize: '0.22rem',
               marginBottom: 5,
             }}>
          <div className='fl'>测评时间：{formatDate(new Date(SpineData.time), 'yyyy-mm-dd')}</div>
          <div className='fr'>测评次数：{SpineData.count}次</div>
        </div>
        <Accordion className='abnormal'>
          <Accordion.Panel header={
              <div className='clearfix'>
                <div className={styles.reportNameLeft}>脊柱机能评估报告</div>
                <div className='reportNameRight'>
                  <span className='scor'>综合得分</span>{SpineData.data.score}分
                </div>
              </div>
          }>
            <div style={{fontSize: '0.22rem'}}>
              <ul className={styles.reporData}>
                <li className='clearfix'>
                  <div className={styles.listLeft}>
                    <img src={BaogImg} />
                  </div>
                  <div className={styles.listRight}>
                    <div>脊柱-姿势（直立）评级</div>
                    <div className={styles.record}>
                      {SpineData.data.spineLoadEvaluate}
                    </div>
                  </div>
                </li>
                <li className='clearfix'>
                  <div className={styles.listLeft}>
                    <img src={BaogImg} />
                  </div>
                  <div className={styles.listRight}>
                    <div>脊柱-柔韧性（直立-前屈）评价</div>
                    <div className={styles.record}>
                      {SpineData.data.spineErectEvaluate}
                    </div>
                  </div>
                </li>
                <li className='clearfix'>
                  <div className={styles.listLeft}>
                    <img src={BaogImg} />
                  </div>
                  <div className={styles.listRight}>
                    <div>脊柱-稳定性（直立-负重）评价</div>
                    <div className={styles.record}>
                      {SpineData.data.spinePronenessEvaluate}
                    </div>
                  </div>
                </li>
                <li className='clearfix'>
                  <div className={styles.listLeft}>
                    <img src={BaogImg} />
                  </div>
                  <div className={styles.listRight}>
                    <div>脊柱形态</div>
                    <div className={styles.record}>
                      {SpineData.data.spinalShape}
                    </div>
                  </div>
                </li>
                <li className='clearfix'>
                  <div className={styles.listLeft}>
                    <img src={BaogImg} />
                  </div>
                  <div className={styles.listRight}>
                    <div>腰部疼痛综合症风险</div>
                    <div className={styles.record}>
                      {SpineData.data.lumbarPainSyndromesRisk}
                    </div>
                  </div>
                </li>
                <li className='clearfix'>
                  <div className={styles.listLeft}>
                    <img src={BaogImg} />
                  </div>
                  <div className={styles.listRight}>
                    <div>腰椎（椎间盘）疾病风险</div>
                    <div className={styles.record}>
                      {SpineData.data.lumbarDiseaseRisk}
                    </div>
                  </div>
                </li>
                <li className='clearfix'>
                  <div className={styles.listLeft}>
                    <img src={BaogImg} />
                  </div>
                  <div className={styles.listRight}>
                    <div>建议</div>
                    <div className={styles.record}>
                      {SpineMorphology}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </Accordion.Panel>
        </Accordion>
      </div>
    );
  }
}
