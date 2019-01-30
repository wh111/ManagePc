/**
 * 试卷管理
 */
let state = {
  info: null, // 试卷基本信息
  questionsType: {}, // 题型
  questionsIds: null, // 记录试题id防止重复添加相同的试题
  znPreview: null // 智能组卷预览提交数据
}
let mutations = {
  /******************************** 初始化 **********************/
  /**
   * 初始化试卷基本信息
   * @param state
   */
  init: state => {
    state.info = {
      'id': '',
      'textbookVersionId': '', // 教材版本ID
      'textbookVersionName': '', // 教材版本名称
      'stage': '', // 阶段：小学0/初中1/高中2
      'subject': '', // 科目：语文/数学/英语【使用code】
      'grade': '', // 年级：1-12
      'term': '', // 学期：0上学期/1下学期
      'types': '', // 组卷方式：0人工组卷/1智能组卷
      'no': '', // 试卷编号
      'name': '', // 试卷名称
      'remark': '', // 试卷名称
      'times': '', // 答题时长：单位秒【转换为分钟显示】
      'score': '', // 满分多少分
      'createTime': '', // 创建时间
      'questionsLen': 0, // 题目数量
      'questionsList': {}, // 试题集合{根据题型id分类}
      'questionsListShowOrder': [], // 试题题型显示顺序
      'scoreType': '', // 计分方式
      'papsersQuestionsTypeScoreList': [], // 试题各题型分数
    }
    state.questionsIds = []
  },
  /**
   * 初始化试题集合
   * @param state
   * @param questionsArr Array
   */
  initQuestionsList: (state, questionsArr = []) => {
    let questionsObj = {}
    let questionsLen = 0
    let score = 0
    state.questionsType = {}
    questionsArr.map(item => {
      // 记录试题
      if (item.childQuestionsList instanceof Array && item.childQuestionsList.length) { // 组题
        item.childQuestionsList.map(cItem => {
          state.questionsIds.push(cItem.oldId || cItem.id)
          score += cItem.score
        })
        questionsLen += item.childQuestionsList.length
      } else { // 非组题
        state.questionsIds.push(item.oldId || item.id)
        questionsLen += 1
        score += item.score
      }
      if (!questionsObj[item.questionsTypeId]) {
        questionsObj[item.questionsTypeId] = []
      }
      if (!state.questionsType[item.questionsTypeId]) {
        state.questionsType[item.questionsTypeId] = item.questionsTypeName
      }
      questionsObj[item.questionsTypeId].push(item)
    })
    state.info.questionsLen = questionsLen
    state.info.questionsList = questionsObj
    state.info.score = score
  },
  /**
   * 初始化智能组卷预览数据
   * @param state
   * @param priviewObj 预览数据
   */
  initZnPreview: (state, priviewObj = null) => state.znPreview = priviewObj,
  // 获取试题类型显示顺序
  getShowQuestionTypeOrder: state => {
    let questionsList = Object.keys(state.info.questionsList)
    let questionTypesOrder = [[], []] // 试题类型排序后的数据(0表示的是系统默认题型、1表示用户自定义题型)
    questionsList.map(id => questionTypesOrder[Number(id) < 0 ? 0 : 1].push(Number(id))) // id分类
    // 排序处理
    questionTypesOrder[0].sort((a, b) => b - a) // 倒序
    questionTypesOrder[1].sort((a, b) => a - b) // 正序
    state.info.questionsListShowOrder = [].concat(...questionTypesOrder[0], ...questionTypesOrder[1])
  },
  /******************************** 添加值 **********************/
  /**
   * 添加题目到题型中
   * @param state
   * @param questionObj  {questionsTypeId:"题型id", question:"题目对象"}
   */
  addQuestionsList: (state, questionObj) => {
    let question = questionObj.question // 添加试题
    let addQuestionNum = 1 // 添加试题的数量
    let childQuestionsList = question.childQuestionsList
    let isGroupQuestion = childQuestionsList instanceof Array && childQuestionsList.length // 组合题型
    // 已经存在的题目不再添加
    if (isGroupQuestion) { // 组题
      childQuestionsList.map(item => {
        if (!!~state.questionsIds.indexOf(item.id)) {
          return false
        }
        console.log(item)
      })
    } else { // 非组题
      if (!!~state.questionsIds.indexOf(question.id)) {
        return false
      }
    }
    // 判断该题型是否存在
    if (!state.info.questionsList[questionObj.questionsTypeId]) {
      state.info.questionsList[questionObj.questionsTypeId] = []
      state.questionsType[questionObj.questionsTypeId] = question.questionsTypeName
    }
    // 追加题目
    state.info.questionsList[questionObj.questionsTypeId].push(question)
    // 增加题数
    state.info.questionsLen += addQuestionNum
    // 增加分数和加入试题id
    if (isGroupQuestion) { // 组合题型
      childQuestionsList.map(item => {
        state.info.score += +item.score
        state.questionsIds.push(item.id)
      })
    } else { // 基础题型
      state.info.score += +question.score
      state.questionsIds.push(question.id)
    }
  },
  /******************************** 值更新 **********************/
  /**
   * 基本更新
   * @param state
   * @upObj {key, value}
   */
  update: (state, upObj) => state[upObj.key] = upObj.value,
  /**
   * 更新试卷基本信息
   * @param state
   * @param infoObj 试卷基本信息对象
   */
  updateInfo: (state, infoObj) => {
    for (let key in state.info) {
      infoObj[key] !== null && !['papsersQuestionsTypeScoreList', 'questionsList'].includes(key) && (state.info[key] = infoObj[key])
    }
    state.info.papsersQuestionsTypeScoreList = infoObj.papsersQuestionsTypeScoreList || []
  },
  /**
   * 更新试题
   * @param state
   * @param questionObj {questionsTypeId:'题型id',index:'需要更新的索引',data:{'新的对象'}}
   */
  updateQuestions: (state, questionObj) => {
    // 已经存在的题目不能更换
    let index = state.questionsIds.indexOf(questionObj.data.id)
    if (!!~index) {
      return false
    }
    let score = state.info.questionsList[questionObj.questionsTypeId][questionObj.index].score // 记录原分数
    questionObj.data.score = score // 更改替换进来试题的分数
    // 移除原题目的id并加入新题的id
    state.questionsIds.splice(index, 1)
    state.questionsIds.push(questionObj.data.id)
    state.info.questionsList[questionObj.questionsTypeId][questionObj.index] = questionObj.data
  },
  /**
   * 改变试题顺序
   * @param state
   * @param questionObj {questionsTypeId:'题型id',index:'移动的索引',type:'up|down'}
   */
  moveQuestionsIndex: (state, questionObj) => {
    let questionsList = state.info.questionsList[questionObj.questionsTypeId]
    let moveData = questionsList[questionObj.index] // 记录删除之前的值
    if (questionObj.type === 'down') {
      questionsList.splice(questionObj.index, 1) // 先删
      questionsList.splice(questionObj.index + 1, 0, moveData) // 再加
    } else {
      questionsList.splice(questionObj.index, 1) // 先删
      questionsList.splice(questionObj.index - 1, 0, moveData) // 再加
    }
  },
  /******************************** 值删除 **********************/
  /**
   * 删除试题
   * @param state
   * @param questionObj {questionsTypeId:'题型id',index:'需要删除的索引'}
   * @returns {*|T[]}
   */
  deleteQuestions: (state, questionObj) => {
    let questionsList = state.info.questionsList[questionObj.questionsTypeId]
    let deleteQuestion = questionsList[questionObj.index]
    let deleteQuestionNum = 1 // 删除试题的数量
    let childQuestionsList = deleteQuestion.childQuestionsList
    let isGroupQuestion = childQuestionsList instanceof Array && childQuestionsList.length // 组合题型

    if (isGroupQuestion) { // 组题
      let scoreSum = 0
      childQuestionsList.map(item => {
        let deleteDataId = item.oldId || item.id
        let index = state.questionsIds.indexOf(deleteDataId)
        scoreSum += +item.score // 统计小题分数
        // 移除原题目的id
        state.questionsIds.splice(index, 1)
      })
      // 减少被删题的分数
      state.info.score -= +scoreSum
    } else { // 基础题型
      let deleteDataId = deleteQuestion.oldId || deleteQuestion.id
      let deleteDataScore = deleteQuestion.score
      let index = state.questionsIds.indexOf(deleteDataId)
      // 移除原题目的id
      state.questionsIds.splice(index, 1)
      // 减少被删题的分数
      state.info.score -= +deleteDataScore
    }
    // 移除试题
    questionsList.splice(questionObj.index, 1)
    // 减少题数
    state.info.questionsLen -= deleteQuestionNum
    // 如果该题型下的所有题目都被删除则删除该题型
    if (!questionsList.length) {
      delete state.info.questionsList[questionObj.questionsTypeId]
    }
  },
  /******************************** 值销毁 **********************/
  destroy: state => {
    state.info = null
    state.questionsIds = null
    state.questionsType = null
  }
}
let actions = {}
let getters = {
  /**
   * 获取试题信息
   * @param state
   * @param id    试题类型id
   * @returns {}
   */
  questionsType: (state, getters) => id => {
    return id && state.questionsType instanceof Object && state.questionsType[id] || state.questionsType
  }
}

export { state, mutations, getters, actions }
