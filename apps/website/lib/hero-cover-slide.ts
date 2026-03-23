import type { Slide } from 'pptx-previewer'

const circlePath = 'M 100 0 A 50 50 0 1 1 100 200 A 50 50 0 1 1 100 0 Z'
const speakerTagPath = 'M 5.5 0 L 254.5 0 Q 260 0 260 5.5 L 260 38.5 Q 260 44 254.5 44 L 5.5 44 Q 0 44 0 38.5 L 0 5.5 Q 0 0 5.5 0 Z'

export const heroCoverSlide: Slide = {
  type: 'cover',
  background: {
    type: 'solid',
    color: '#FFFFFF'
  },
  elements: [
    {
      type: 'shape',
      left: -165,
      top: -165,
      width: 330,
      height: 330,
      viewBox: [200, 200],
      path: circlePath,
      fill: {
        type: 'solid',
        color: 'rgb(221, 182, 170)'
      },
      fixedRatio: true
    },
    {
      type: 'shape',
      left: 855,
      top: 417.5,
      width: 290,
      height: 290,
      viewBox: [200, 200],
      path: circlePath,
      fill: {
        type: 'solid',
        color: 'rgb(223, 231, 192)'
      },
      fixedRatio: true
    },
    {
      type: 'text',
      width: 519.5,
      height: 60.046875,
      left: 240.25,
      top: 130.1,
      defaultColor: '#333',
      content: '<p style="text-align: center;"><strong><span style="font-size: 26.7px; color: rgb(128, 147, 125);">商务汇报|工作总结|工作计划</span></strong></p>'
    },
    {
      type: 'text',
      width: 882.6,
      height: 101,
      left: 58.7,
      top: 190.2,
      defaultColor: '#333',
      content: '<p style="text-align: center;"><strong><span style="font-size: 54px; color: rgba(128,147,125,1);">模板封面标题</span></strong></p>'
    },
    {
      type: 'text',
      width: 621.9931198102015,
      height: 92,
      left: 189.00344009489925,
      top: 291.1410407151062,
      defaultColor: '#333',
      content: '<p style="text-align: center;"><span style="font-size: 16px; color: rgb(128, 147, 125);">模板封面正文模板封面正文模板封面正文模板封面正文模板封面正文模板封面正文模板封面正文模板封面正文模板封面正文模板封面正文模板封面正文模板封面正文模板封面正文</span></p>'
    },
    {
      type: 'shape',
      width: 260,
      height: 44,
      left: 370,
      top: 417.5,
      viewBox: [260, 44],
      path: speakerTagPath,
      fill: {
        type: 'solid',
        color: '#ddb6aa'
      },
      text: {
        content: '<p style="text-align: center;"><em><span style="font-size: 16px; color: #ffffff;">演讲人：XXX</span></em></p>',
        defaultColor: '#333',
        align: 'middle'
      }
    }
  ]
}

export const heroCoverJsonSnippet = `{
  "type": "cover",
  "background": {
    "type": "solid",
    "color": "#FFFFFF"
  },
  "elements": [
    {
      "type": "shape",
      "left": -165,
      "top": -165,
      "width": 330,
      "height": 330,
      "viewBox": [200, 200],
      "path": "...",
      "fill": "rgb(221, 182, 170)",
      ...
    },
    ...
  ],
}`
