var amazon = require('amazon-product-api');

var client = amazon.createClient({
  awsId: Meteor.settings.private.amazon.awsId,
  awsSecret: Meteor.settings.private.amazon.awsSecret,
  awsTag: Meteor.settings.private.amazon.awsTag
});

Meteor.methods({
   itemSearch(appUUID, searchParameters) {
    itemSearchCommon(appUUID, searchParameters);
   }
});


itemSearchCommon = function (appUUID, searchParameters) {
      for(var searchParametersKey in searchParameters)
      {
         console.log(appUUID + ":searchParameters:" + searchParametersKey + "=" + searchParameters[searchParametersKey]);
      }
      var searchResult = {
               appUUID: appUUID,
               title: searchParameters.title,
               author: searchParameters.author,
               keyWords: searchParameters.keywords,
               isbn: searchParameters.isbn
      };

      var query ={
         responseGroup: 'ItemAttributes, Images'
      }

      if(searchParameters.keywords)
      {
         query.keywords = searchParameters.keywords;
         query.searchIndex = "All";

      } else if (searchParameters.isbn) {
          query.keywords = searchParameters.isbn;
          query.searchIndex = "Books";
      }  else if (searchParameters.title && searchParameters.author) {
          query.title = searchParameters.title
          query.author = searchParameters.author
          query.searchIndex = "Books";
      } else {
         console.log(appUUID +":No valid search parameters");
      }
      for(var queryKey in query)
      {
         console.log(appUUID + ":query:" + queryKey + "=" + query[queryKey]);
      }

      client.itemSearch(query).then(function(results){
         console.log(appUUID + ':result returned on item search api call:')
          searchResult.results = Meteor.call('substitueKey', appUUID, results, "$" , "i-lend");
          //console.log('Stringified response object' + JSON.stringify(results, null, 4));
          for(var searchResultKey in searchResult.results) {
            var bookUpserted = Books.upsert({
                  ASIN: searchResult.results[searchResultKey].ASIN

                  }, {
                  $set: {
                      ASIN: searchResult.results[searchResultKey].ASIN,
                     DetailPageURL: searchResult.results[searchResultKey].DetailPageURL,
                     ItemLinks: searchResult.results[searchResultKey].ItemLinks,
                     SmallImage: searchResult.results[searchResultKey].SmallImage,
                     MediumImage: searchResult.results[searchResultKey].MediumImage,
                     LargeImage: searchResult.results[searchResultKey].LargeImage,
                     ImageSets: searchResult.results[searchResultKey].ImageSets,
                     ItemAttributes: searchResult.results[searchResultKey].ItemAttributes
                  }
               })
            var currentDoc = Books.findOne({ASIN: searchResult.results[searchResultKey].ASIN});
            // for(var currentDocKey in currentDoc) {
            //    console.log("currentDocKey=" + currentDocKey + " value=" + currentDoc[currentDocKey]);
            // }
               searchResult.results[searchResultKey].ilendbooksId = currentDoc["_id"];
               console.log(appUUID + ":itemSearchCommon:ilendID: " + searchResult.results[searchResultKey].ilendbooksId);
         }

         var stringifiedResults = JSON.stringify(searchResult, null, 4);
         var upsertResult = SearchResult.upsert( {
               appUUID: appUUID,
               title: searchParameters.title,
               author: searchParameters.author,
               keyWords: searchParameters.keywords,
               isbn: searchParameters.isbn
            },
            {
               $set: {results: searchResult.results}
            }
         );
         for(upsertResultKey in upsertResult) {
            console.log(appUUID + ':itemSearchCommon:upsertResult='+ upsertResult[upsertResultKey]);
         }
         console.log(appUUID + ':itemSearchCommon:isBccAdmin='+ isBccAdmin());
         console.log(appUUID + ':itemSearchCommon:isSmsAdmin='+ isSmsAdmin());
         if(isBccAdmin()) {
           // email sent is for debugging purpose only, can be commemted 
            var emailResult = Email.send({
              to: "jayjo7@hotmail.com",
              from: "ilendbooks<admin@ilendbooks.com>",
              subject: "itemSearch - result",
              text: stringifiedResults
           });
            console.log(appUUID + ':itemSearchCommon:Email sent')
          }
      }).catch(function(err){
            console.log(err);
            console.log('Stringified error object' + JSON.stringify(err, null, 4));
            searchResult.isError=true;
            SearchResult.upsert({
                appUUID: appUUID,
                title: searchParameters.title,
                author: searchParameters.author,
                keyWords: searchParameters.keywords,
                isbn: searchParameters.isbn,
                isError:true
            },    
            { 
               $set: {error: err }
            }
            );
         });
      return searchResult;
}
