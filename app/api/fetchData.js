export const fetchData = (contentType, entryId, stackInstance) => {
  try {
    if (entryId) {
      let Query = stackInstance.ContentType(contentType).Entry(entryId);
      return Query.fetch().then(
        function success(entry) {
          //console.info("stack", Stack);
          return entry;
        },
        function error(err) {
          console.log("Error", err);
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
};


export const fetchSpecificEntry = async (contentTypeUID, stackInstance, categoryid) => {
  try {
    const query = stackInstance.ContentType(contentTypeUID).Query();
    // console.log(query, "query in fetch func")
    // Fetch all entries
    const result = await query.where("category_picker.data.id", `${categoryid}`).toJSON().find();
    // console.log(result, "result in fetch func");
    return result;
    // Process and use the result

  } catch (error) {
    // console.error('Error fetching entries:', error);
    return {}
  }

}

export const fetchPageLabelsEntry = async (contentTypeUID, stackInstance, entryId, locale) => {
  try {
    const result = await stackInstance.ContentType(contentTypeUID)
      .Query().where('uid', entryId).language(locale).toJSON().find();
    return result;
    // Process and use the result

  } catch (error) {
    // console.error('Error fetching entries:', error);
    return {}
  }

}


export const getEntry = async ({ contentTypeUid, referenceFieldPath, jsonRtePath, lang, stackInstance }) => {
  return new Promise((resolve, reject) => {
    const query = stackInstance.ContentType(contentTypeUid).Query().language(lang || 'en-us');
    if (referenceFieldPath) query.includeReference(referenceFieldPath);
    query
      .toJSON()
      .find()
      .then(
        (result) => {
          jsonRtePath &&
            Utils.jsonToHTML({
              entry: result,
              paths: jsonRtePath,
              renderOption,
            });
          resolve(result);
        },
        (error) => {
          reject(error);
        }
      );
  });
}

