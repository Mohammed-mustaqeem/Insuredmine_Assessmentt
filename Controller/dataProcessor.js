import { parentPort, workerData } from 'worker_threads';
import XLSX from 'xlsx';
import mongoose from 'mongoose';
import userModel from '../Models/userModel.js';
import userAccountModel from '../Models/usersAccount .js';
import policyCategoryModel from '../Models/policyCategory.js';
import policyCarrierModel from '../Models/policyCarrier.js';
import policyInfoModel from '../Models/policyInfo.js';
import agentModel from '../Models/agentModel.js';
import moment from 'moment';
import connectDB from '../db/connectDB.js';

const parseExcelDate = (excelDate) => {
  if (typeof excelDate === 'number') {
    const excelEpoch = new Date(1899, 11, 30);
    return new Date(excelEpoch.getTime() + (excelDate - 1) * 86400000);
  } else if (typeof excelDate === 'string') {
    return moment(excelDate, ['DD-MM-YY', 'DD-MM-YYYY'], true).toDate();
  } else {
    return new Date(NaN); 
  }
};

const parseAndInsertData = async (filePath) => {
  try {
    const workbook = XLSX.readFile(filePath);
    const sheetNameList = workbook.SheetNames;
    if (!sheetNameList || sheetNameList.length === 0) {
      throw new Error('No sheets found in the uploaded file.');
    }
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);
  
    for (const row of data) {
    const policyStartDate = parseExcelDate(row['policy_start_date']);
      const policyEndDate = parseExcelDate(row['policy_end_date']);

      if (isNaN(policyStartDate.getTime()) || isNaN(policyEndDate.getTime())) {
        throw new Error(`Invalid date format in row: ${JSON.stringify(row)}`);
    }

      const agent = await agentModel.create({ agent: row['agent'] });

      const user = await userModel.create({
        firstname: row['firstname'],
        dob:parseExcelDate(row['dob']),
        address: row['address'],
        phone: row['phone'],
        state: row['state'],
        zip: row['zip'],
        email: row['email'],
        gender: row['gender'],
        userType: row['userType'],
      });

      const userAccount = await userAccountModel.create({
        account_name: row['account_name'],
        userId: user._id,
      });

      const policyCategory = await policyCategoryModel.create({
        category_name: row['category_name'],
      });

      const policyCarrier = await policyCarrierModel.create({
        company_name: row['company_name'],
      });

      await policyInfoModel.create({
        policy_number: row['policy_number'],
        policy_start_date: policyStartDate,  // Convert to JavaScript Date
        policy_end_date: policyEndDate,
        policyCategoryId: policyCategory._id,
        companyId: policyCarrier._id,
        userId: user._id,
      });
    }

    parentPort.postMessage('Data processing completed.');
  } catch (error) {
    parentPort.postMessage(`Error processing data: ${error.message}`);
  }
};

connectDB(process.env.DBSTRING, process.env.DBNAME).then(() => {
  parseAndInsertData(workerData.filePath);
});
