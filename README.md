# 住民與醫囑專案 - 前端

使用 React, Typescript, Material UI, NodeJS v20.15.0

## 注意事項

目前並未實作住民照片，故請確保5位預設住民的Id為 "1", "2", "3", "4", "5" 

## 實作說明
1. 使用 react hooks 進行 componet 內的資料存取
2. UI 設計為，點擊住民頭像底下的 `SHOW ORDER`，打開dialog，此時若已有醫囑，便會取出顯示在畫面上，點擊右上角的 `+` 符號，在醫囑最下方會顯示新增輸入框，輸入完成後，按下 `CREATE` 變可新增醫囑，點擊醫囑旁的 `鉛筆Icon` 則會進入編輯模式，修改後，按下 `UPDATE` 即可完成編輯。

## 初始資料範本
```json
[
    {
        "_id" : "1",
        "Name" : "Eden Wang",
        "OrderId" : ""
    },
    {
        "_id" : "2",
        "Name" : "Larry Lai",
        "OrderId" : ""
    },
    {
        "_id" : "3",
        "Name" : "Ellie Su",
        "OrderId" : ""
    },
    {        
        "_id" : "4",
        "Name" : "Carol Sun",
        "OrderId" : ""
    },
    {        
        "_id" : "5",
        "Name" : "Jenny Hsu",
        "OrderId" : ""
    }
]
```