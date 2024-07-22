module.exports = function (eleventyConfig) {
  let n = 1
  eleventyConfig.addPassthroughCopy("styles.css");
  eleventyConfig.addNunjucksFilter(
    "sortBy",
    function (arrOrObj, attribute, reverse = false) {
      if (Array.isArray(arrOrObj)) {
        return arrOrObj.sort((a, b) => {
          if (reverse) {
            return a[attribute] - b[attribute];
          } else {
            return b[attribute] - a[attribute];
          }
        });
      } else {
        return Object.keys(arrOrObj)
          .sort((a, b) => {
            if (reverse) {
              return arrOrObj[a][attribute] - arrOrObj[b][attribute];
            } else {
              return arrOrObj[b][attribute] - arrOrObj[a][attribute];
            }
          })
          .reduce((acc, key) => {
            acc[key] = arrOrObj[key];
            return acc;
          }, {});
      }
    }
  );

  eleventyConfig.addNunjucksFilter("limit", function (arrOrObj, limit) {
    if (Array.isArray(arrOrObj)) {
      return arrOrObj.slice(0, limit);
    } else {
      return Object.keys(arrOrObj)
        .slice(0, limit)
        .reduce((acc, key) => {
          acc[key] = arrOrObj[key];
          return acc;
        }, {});
    }
  });

  eleventyConfig.addNunjucksFilter("randomizeOrder", function (arrOrObj) {
    if (Array.isArray(arrOrObj)) {
      return arrOrObj.sort(() => Math.random() - 0.5);
    } else {
      return Object.keys(arrOrObj)
        .sort(() => Math.random() - 0.5)
        .reduce((acc, key) => {
          acc[key] = arrOrObj[key];
          return acc;
        }, {});
    }
  });

  eleventyConfig.addNunjucksFilter("SortToMiddlePeak", function (arrOrObj) {
    // sort so that the middle value is the highest and the values decrease as you move away from the middle
    // sort first ascending then take every other value and reverse it
    if (Array.isArray(arrOrObj)) {
      const sorted = arrOrObj.sort((a, b) => b - a);
      const firstHalf = sorted.filter((_, i) => i % 2 === 0);
      const secondHalf = sorted.filter((_, i) => i % 2 === 1);
      const reversed = secondHalf.reverse();
      return [...reversed, ...firstHalf];
    } else {
      const keys = Object.keys(arrOrObj);
      const sorted = keys.sort((a, b) => arrOrObj[b] - arrOrObj[a]);
      const firstHalf = sorted.filter((_, i) => i % 2 === 0);
      const secondHalf = sorted.filter((_, i) => i % 2 === 1);
      const reversed = secondHalf.reverse();
      const result = {};
      [...reversed, ...firstHalf].forEach((key, i) => {
        result[key] = arrOrObj[key];
      });
      return result;
    }
  });

  eleventyConfig.addNunjucksFilter("SortAlphabetically", function (arrOrObj) {
    if (Array.isArray(arrOrObj)) {
      return arrOrObj.sort();
    } else {
      return Object.keys(arrOrObj)
        .sort()
        .reduce((acc, key) => {
          acc[key] = arrOrObj[key];
          return acc;
        }, {});
    }
  });

  eleventyConfig.addNunjucksFilter("toFixed", function (num) {
    return parseFloat(num + '').toFixed(2);
  });

  eleventyConfig.addNunjucksFilter("merge", function (obj, obj2) {
    return { ...obj, ...obj2 };
  });

  eleventyConfig.addNunjucksFilter("minMax", function (num, min, max) {
    return Math.min(Math.max(num, min), max);
  });

  eleventyConfig.addNunjucksFilter("map", function (arr, keys) {
    const mapresult = {};
    keys.forEach((key, i) => {
      mapresult[key] = []
    });
    arr.forEach((item, i) => {
      keys.forEach((key, j) => {
        mapresult[key].push(item[key]);
      });
    });
    return mapresult;
  });
  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
