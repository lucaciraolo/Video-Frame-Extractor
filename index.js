const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');
const csv = require('csvtojson')

const csvFilePath = 'input.csv'
const videoFolder = "D:\\Footage\\Holidays\\Dominican Republic Xmas 2017\\Mavic"
const outputFolder = 'output'

csv()
.fromFile(csvFilePath)
.on('json',(data)=>{
    // combine csv header row and csv line to a json object
    const videoFile = `${videoFolder}\\DJI_00${data.File}.MOV`
    const frameTime = `00:${data.Time}`
    const outputFile = `file-${data.File}-frame-time-${data.Time.replace(':', '-')}.jpg`
    
    const command = `"${ffmpeg.path}" -ss ${frameTime} -i "${videoFile}" -frames:v 1 "output\\${outputFile}"`
    execSync(command, {stdio:[0,1,2]});
    // console.log(command)
})
.on('done',(error)=>{
    console.log('DONE!')
})




