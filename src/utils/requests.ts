import axios, { AxiosRequestConfig } from 'axios';

function justLog(...args: any[]) {
  for (const arg of args) {
    console.log('Requests:', arg);
  }
}

async function getResponse(options: AxiosRequestConfig, successCallback = justLog, errorCallback = justLog) {
  try {
    const response = await axios(options);
    successCallback(response.data);
  } catch (error) {
    errorCallback(error);
  }
}

async function multiRequest(options: AxiosRequestConfig[], successCallback: (data: any) => void, errorCallback = justLog) {
  let datas: any[] = [];
  let index = 0;
  const func = async (data: any) => {
    datas.push(data);
    index += 1;
    if (index < options.length) {
      await getResponse(options[index], func, errorCallback);
    } else {
      successCallback(datas);
    }
  };
  await getResponse(options[index], func, errorCallback);
}

async function multiRequest2(options: AxiosRequestConfig[], successCallback: (data: any) => void, afterAll = justLog, errorCallback = justLog) {
  let index = 0;
  const func = async (data: any) => {
    successCallback(data);
    index += 1;
    if (index < options.length) {
      await getResponse(options[index], func, errorCallback);
    } else {
      afterAll();
    }
  };
  await getResponse(options[index], func, errorCallback);
}

export default { multiRequest, getResponse, multiRequest2 };
