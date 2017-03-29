// 体成分评估报告
import React, {Component, PropTypes} from 'react';
import { NavBar, Icon, Accordion, List } from 'antd-mobile';
import { formatDate } from 'xunyijia-components/src/utils/tool';
const LeftImg = require('img/return@2x.png');
const BaogImg = require('img/baogao@2X.png');
const styles = require('./HealthReport.scss');

export default class BodyComposition extends Component {
  render() {
    const { BodyCompositionData } = this.props;
    let ObesityProposal = ''; // 保存腹部肥胖程度建议的值
    let DistributionProposal = ''; // 保存肥胖分布建议的值
    switch (BodyCompositionData.data.abdominalObesity) {
      case '内脏型':
        ObesityProposal = '内脏型肥胖一般内脏肥胖含量高，发生心血管疾病的危险性较高，建议你控制饮食的摄入，并进行适量的运动。';
        break;
      case '正常':
        ObesityProposal = '你脂肪腹部分布很标准，建议你保持合理膳食和适量运动。';
        break;
      case '皮下型':
        ObesityProposal = '皮下型肥胖一般集中在四肢和皮下，发生糖尿病、心血管疾病的危险性较高，建议你控制饮食的摄入，并进行适量的运动。';
        break;
      default:
        break;
    }
    switch (BodyCompositionData.data.fatDistribution) {
      case '苹果型':
        DistributionProposal = '苹果型体形的人脂肪通常分布在腰腹部，苹果型体形人患心脏病、糖尿病等疾病的危险系数更大。';
        break;
      case '正常':
        DistributionProposal = '你的腰部和臀部的脂肪分布均衡，建议你保持合理膳食和适量运动。';
        break;
      case '梨型':
        DistributionProposal = '梨型体形的人脂肪通常分布在臀部，梨型体形人患心脏病、糖尿病等疾病的危险系数更大。';
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
               fontSize: '0.28rem'
             }}>
          <div className='fl'>测评时间：{formatDate(new Date(BodyCompositionData.time), 'yyyy-mm-dd')}</div>
          <div className='fr'>测评次数：{BodyCompositionData.count}次</div>
        </div>
        <Accordion className='abnormal'>
          <Accordion.Panel header={
              <div className='clearfix'>
                <div className={styles.reportNameLeft}>体成份评估报告</div>
                <div className='reportNameRight'>
                  <span className='scor'>综合得分</span>
                  {BodyCompositionData.data.score}分
                </div>
              </div>
          }>
            <div style={{fontSize: '0.28rem'}}>
              <ul className={styles.reporData}>
                <li className='clearfix'>
                  <div className={styles.listLeft}>
                    <img src={BaogImg} />
                  </div>
                  <div className={styles.listRight}>
                    <div>体脂肪率级别</div>
                    <div className={styles.record}>
                      {BodyCompositionData.data.bodyFatLevel}
                    </div>
                  </div>
                </li>
                <li className='clearfix'>
                  <div className={styles.listLeft}>
                    <img src={BaogImg} />
                  </div>
                  <div className={styles.listRight}>
                    <div>身体质量指数BMI级别</div>
                    <div className={styles.record}>
                      {BodyCompositionData.data.BMI}
                    </div>
                  </div>
                </li>
                <li className='clearfix'>
                  <div className={styles.listLeft}>
                    <img src={BaogImg} />
                  </div>
                  <div className={styles.listRight}>
                    <div>腹部肥胖程度</div>
                    <div className={styles.record}>
                      {BodyCompositionData.data.abdominalObesity}
                    </div>
                  </div>
                </li>
                <li className='clearfix'>
                  <div className={styles.listLeft}>
                    <img src={BaogImg} />
                  </div>
                  <div className={styles.listRight}>
                    <div>腹部肥胖程度建议</div>
                    <div className={styles.record}>
                      {ObesityProposal}
                    </div>
                  </div>
                </li>
                <li className='clearfix'>
                  <div className={styles.listLeft}>
                    <img src={BaogImg} />
                  </div>
                  <div className={styles.listRight}>
                    <div>目标体重</div>
                    <div className={styles.record}>
                      {BodyCompositionData.data.goalWeight}
                    </div>
                  </div>
                </li>
                <li className='clearfix'>
                  <div className={styles.listLeft}>
                    <img src={BaogImg} />
                  </div>
                  <div className={styles.listRight}>
                    <div>肥胖分布</div>
                    <div className={styles.record}>
                      {BodyCompositionData.data.fatDistribution}
                    </div>
                  </div>
                </li>
                <li className='clearfix'>
                  <div className={styles.listLeft}>
                    <img src={BaogImg} />
                  </div>
                  <div className={styles.listRight}>
                    <div>肥胖分布建议</div>
                    <div className={styles.record}>
                      {DistributionProposal}
                    </div>
                  </div>
                </li>
                <li className='clearfix'>
                  <div className={styles.listLeft}>
                    <img src={BaogImg} />
                  </div>
                  <div className={styles.listRight}>
                    <div>体重控制</div>
                    <div className={styles.record}>
                      {BodyCompositionData.data.weightControl}
                    </div>
                  </div>
                </li>
                <li className='clearfix'>
                  <div className={styles.listLeft}>
                    <img src={BaogImg} />
                  </div>
                  <div className={styles.listRight}>
                    <div>肌肉控制</div>
                    <div className={styles.record}>
                      {BodyCompositionData.data.muscleControl}
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
