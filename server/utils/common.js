gmtOffset = function() {
	return  Meteor.settings.public.gmtOffset;
};

isBccAdmin = function() {
	return  Meteor.settings.private.admin.bcc;
};

isSmsAdmin = function() {
	return  Meteor.settings.private.admin.sms;
};

getAdminEmail = function() {
	return  Meteor.settings.private.admin.email;
};

getAdminPhone = function() {
	return  Meteor.settings.private.admin.phone;
};

getBcc = function () {
	console.log('isBccAdmin()=' + isBccAdmin());
	console.log('getAdminEmail()=' + getAdminEmail());
	if(isBccAdmin())
	{
		console.log('getAdminEmail()=' + getAdminEmail());
		return getAdminEmail();
	}
}

Meteor.methods({
	substitueKey(appUUID, data, searchKeyValue, replaceKeyValue){
		console.log(appUUID + ":substitueKey:data="+data);
		console.log(appUUID + ":substitueKey:searchKeyValue=" + searchKeyValue);
		console.log(appUUID + ":substitueKey:replaceKeyValue=" + replaceKeyValue);
		if (lodash.isObject(data)) {
			data = genericReplaceKey (appUUID, data, searchKeyValue, replaceKeyValue)
		} else {
			console.log(appUUID + ": the object in null");
		}

		return data;
	},

  	getLocalTime() {
      return moment().utcOffset(gmtOffset()).format('MM/DD/YYYY HH:mm:ss:SSS');

  	}
});

genericReplaceKey = function(appUUID, data, searchKeyValue, replaceKeyValue) {
		// console.log(appUUID + ":genericReplaceKey:data="+data);
		// console.log(appUUID + ";genericReplaceKey:searchKeyValue=" + searchKeyValue);
		// console.log(appUUID + ":genericReplaceKey:replaceKeyValue=" + replaceKeyValue);
		// console.log(appUUID + ":genericReplaceKey:size=" + lodash.size(data));
		if(lodash.isArray(data)){

			for(var key_one in data) {
				//console.log(appUUID + ":genericReplaceKey-Array:key_one="+key_one + ";value=" + data[key_one]);
				genericReplaceKey (appUUID, data[key_one], searchKeyValue, replaceKeyValue);
			}
		} else {
			//console.log(appUUID + ":genericReplaceKey:data is not an array");

			var arrayKeys = lodash.keys(data);
			//console.log(appUUID + ":genericReplaceKey:arrayKeys=" + arrayKeys.toString());

			for( var arrayKey in arrayKeys) {
				if(arrayKeys[arrayKey]===searchKeyValue)
				{
					//console.log(appUUID + ":genericReplaceKey:replacing the key");
					data[replaceKeyValue] = data[arrayKeys[arrayKey]];
					lodash.unset(data, arrayKeys[arrayKey]);
				}

			}
			var arrayKeys = lodash.keys(data);
			//console.log(appUUID + ":genericReplaceKey:arrayKeys-after-removing=" + arrayKeys.toString());
			for(var keyTwo in data)
			{
				// console.log(appUUID + ":genericReplaceKey:keyTwo="+keyTwo + ";value=" + data[keyTwo]);
				// console.log(appUUID + ":genericReplaceKey:size="+lodash.size(data[keyTwo]));
				// var hasOwnProperty = data.hasOwnProperty(keyTwo);
				// console.log(appUUID + ":genericReplaceKey:keyTwo="+ keyTwo + ";hasOwnProperty=" +hasOwnProperty);
				// var isObject = lodash.isObject(data[keyTwo]);
				// console.log(appUUID + ":genericReplaceKey:keyTwo="+ keyTwo + ";isObject=" +isObject);
				// var isArray = lodash.isArray(data[keyTwo]);
				// console.log(appUUID + ":genericReplaceKey:keyTwo="+ keyTwo + ";isArray=" +isArray);
				// console.log(appUUID + ":genericReplaceKey:keyTwo="+ keyTwo + ";value-two=" +data[keyTwo][0]);
				// var isObjectTwo = lodash.isObject(data[keyTwo][0]);
				// console.log(appUUID + ":genericReplaceKey:keyTwo="+ keyTwo + ";isObjectTwo=" +isObjectTwo);
				// var isNumber = lodash.isNumber(data[keyTwo][0]);
				// console.log(appUUID + ":genericReplaceKey:keyTwo="+ keyTwo + ";isNumber=" +isNumber);
				// var isString = lodash.isString(data[keyTwo][0]);
				// console.log(appUUID + ":genericReplaceKey:keyTwo="+ keyTwo + ";isString=" +isString);

				if(lodash.isObject(data[keyTwo][0])){
					genericReplaceKey (appUUID, data[keyTwo], searchKeyValue, replaceKeyValue);
				} 
				// else {
				// 	console.log(appUUID + ":genericReplaceKey-innner:key="+ keyTwo + ";value=" + data[keyTwo]);
				// }
			}
		}

		return data;
}