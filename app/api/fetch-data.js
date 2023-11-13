import { Stack } from "@/app/api/contentstack-sdk/index";
import * as Utils from "@contentstack/utils";

const renderOption = {
  span: (node, next) => next(node.children),
};

/**
 *fetches specific entry from a content-type
 *
 * @param {* content-type uid} contentTypeUid
 * @param {* url for entry to be fetched} entryUrl
 * @param {* reference field name} referenceFieldPath
 * @param {* Json RTE path} jsonRtePath
 * @returns
 */
export function getEntryByUrl({
  contentTypeUid,
  entryUrl,
  referenceFieldPath,
  jsonRtePath,
  lang,
}) {
  return new Promise((resolve, reject) => {
    const blogQuery = Stack.ContentType(contentTypeUid)
      .Query()
      .language(lang || "en-us");
    if (referenceFieldPath) blogQuery.includeReference(referenceFieldPath);
    blogQuery.includeOwner().toJSON();
    const data = blogQuery.where("url", `${entryUrl}`).find();
    data.then(
      (result) => {
        jsonRtePath &&
          Utils.jsonToHTML({
            entry: result,
            paths: jsonRtePath,
            renderOption,
          });
        resolve(result[0]);
      },
      (error) => {
        console.error(error);
        reject(error);
      }
    );
  });
}


export const getPageRes = async (pageType, entryUrl, lang) => {
  try {
    const response = await getEntryByUrl({
      contentTypeUid: pageType,
      entryUrl,
      referenceFieldPath: ["modular_blocks.referenced_section.reference"],
      jsonRtePath: [],
      lang: lang,
    });
    return response[0];
  } catch (error) {
    throw error;
  }
};

export const fetchData = (contentType, entryId) => {
  try {
    if (entryId) {
      let Query = Stack.ContentType(contentType).Entry(entryId);
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

export const getAssociatedCategoryLayouts = async ({
  contentTypeUid,
  lang,
  catCodes,
  referenceFieldPath,
  jsonRtePath,
}) => {
  return new Promise((resolve, reject) => {
    if (!catCodes || catCodes.length < 1) resolve([null]);
    const queries = catCodes.map((code) => {
      const query = Stack.ContentType(contentTypeUid)
        .Query()
        .language(lang || 'en-us')
        .where("category_picker.data.id", code);
      return query;
    });
    const Query = Stack.ContentType(contentTypeUid)
      .Query()
    if (referenceFieldPath) Query.includeReference(referenceFieldPath);
    Query.or(...queries)
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

export const fetchPageLabelsEntry = async (contentTypeUID, entryId, locale) => {
  try {
    const result = await Stack.ContentType(contentTypeUID)
      .Query()
      .where("uid", entryId)
      .language(locale)
      .toJSON()
      .find();
    return result;
    // Process and use the result
  } catch (error) {
    // console.error('Error fetching entries:', error);
    return {};
  }
};

export const getEntry = async ({
  contentTypeUid,
  referenceFieldPath,
  jsonRtePath,
  lang,
}) => {
  return new Promise((resolve, reject) => {
    const query = Stack.ContentType(contentTypeUid)
      .Query()
      .language(lang || "en-us");
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
};
