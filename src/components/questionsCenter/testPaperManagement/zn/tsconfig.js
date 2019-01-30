let opt = {
    "textbookVersionId": '', // 教材版本ID
    "textbookVersionName": "", // 教材版本名称
    "stage": "", // 阶段：小学0/初中1/高中2
    "subject": "", // 科目：语文/数学/英语【使用code】
    "grade": "", // 年级：1-12
    "term": "", // 学期：0上学期/1下学期
    "types": "", // 组卷方式：0人工组卷/1智能组卷
    "no": "", // 试卷编号
    "name": "", // 试卷名称
    "remark": "", // 试卷名称
    "times": "", // 答题时长：单位秒【转换为分钟显示】
    "score": "", // 满分多少分
    "questionsList": [ // 试题集合
        {
            "diffLevel": "", // 难度
            "questionsTypeId": "", // 题型ID
            "score": "", // 分值
            "knowledgeList": ["知识点", "汉语拼音", "论语"], // 知识点数组
            "titleType": "", // 题目类别：0文字/1图片/2音视频
            "titleExt": "", //  图片或音视频路径
            "title": "", // 题目内容：文字
            "answer": "", // 正确答案：多个|隔开
            "answerExplain": "", // 答案解析
            "seq": "", // 排序
            "questionsOptions": [ // 试题选项：单选题、多选题、判断题 有此项。填空题 没有此项
                {
                    "optionsType": "", // 试题选项：单选题、多选题、判断题 有此项。填空题 没有此项
                    "optionsExt": "", // 图片或音视频路径
                    "options": "", // 选项(A/B/C)
                    "content": "" // 选项文字内容
                }
            ],
            "questionsKeyword": [ // 试题关键词： 填空题有此项，单选题，多选题、判断题没有此项
                {
                    "tag": "", // 关键词
                    "weight": 1 // 权重
                }
            ]
        }
    ]
}