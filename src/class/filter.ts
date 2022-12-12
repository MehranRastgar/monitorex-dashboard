import { SearchType } from "../store/slices/settingsSlice";
import { NextRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

export default class Filter {
  search: SearchType;

  constructor(search: SearchType) {
    this.search = search;
    console.log("constructor called");
  }

  SearchSetter(search: SearchType) {
    this.search = search;
  }

  async quertAdder(search: SearchType) {}
  async queryRemover() {}

  async convertObjectToParam(query: object) {
    var keys: string[] = Object.keys(query);
    var values: string[] = Object.values(query);
    var uri: string = "?";
    keys.map((key, index) => {
      uri += key + "=" + values[index];
      if (keys.length > index + 1) {
        uri += "&";
      }
    });
    return uri;
  }

  convertObjectToParamSync(query: object) {
    var keys: string[] = Object.keys(query);
    var values: string[] = Object.values(query);
    var uri: string = "?";
    keys.map((key, index) => {
      uri += key + "=" + values[index];
      if (keys.length > index + 1) {
        uri += "&";
      }
    });
    return uri;
  }

  addOrRemoveFromQuery(
    item: string,
    obj: ParsedUrlQuery,
    state: boolean
  ): ParsedUrlQuery {
    if (state === false) eval(`delete obj.${item?.toString()}`);
    else eval(`obj.${item?.toString()}='true'`);
    return obj;
  }
  initFilter(searchConf: SearchType, router: NextRouter): SearchType {
    const category: string[] =
      typeof router?.query?.category === "string"
        ? router?.query?.category.split(",")
        : [];
    const brands: string[] =
      typeof router?.query?.brands === "string"
        ? router?.query?.brands.split(",")
        : [];
    const isSale: boolean =
      typeof router?.query?.issale === "string" &&
      router?.query?.issale === "true"
        ? true
        : false;
    const justAvailable: boolean =
      typeof router?.query?.available === "string" &&
      router?.query?.available === "true"
        ? true
        : false;
    const unbleivable: boolean =
      typeof router?.query?.unbleivable === "string" &&
      router?.query?.unbleivable === "true"
        ? true
        : false;
    const pricegte: number =
      typeof router?.query?.pricegte === "string" &&
      Number(router?.query?.pricegte) > 0
        ? Number(router?.query?.pricegte)
        : 0;
    const pricelte: number =
      typeof router?.query?.pricelte === "string" &&
      Number(router?.query?.pricelte) > 0
        ? Number(router?.query?.pricelte)
        : 0;

    return (searchConf = {
      ...searchConf,
      filter: {
        brands: [...brands],
        category: [...category],
        isSale: isSale,
        justAvailable: justAvailable,
        unbleivable: unbleivable,
        priceRange: { pricegte: pricegte, pricelte: pricelte },
        availableBrands: searchConf.filter.availableBrands,
      },
    });
  }
  async changeFilter(searchConf: SearchType, router: NextRouter) {
    // if (searchConf?.filter?.state === false) {
    //   delete router?.query?.pricelte;
    //   delete router?.query?.pricegte;

    //   const queryString: string = await this.convertObjectToParam(router.query);
    //   router.push(`${router.pathname}${queryString}`);
    // }
    if (
      searchConf.filter?.priceRange?.pricegte !== undefined &&
      searchConf.filter?.priceRange?.pricelte !== undefined
    ) {
      router.query["pricegte"] =
        searchConf.filter?.priceRange?.pricegte.toString();
      router.query["pricelte"] =
        searchConf.filter?.priceRange?.pricelte.toString();
      if (Number(router?.query?.pricelte) < 1) {
        delete router?.query?.pricelte;
        delete router?.query?.pricegte;
      }
    }
    router.query = this.addOrRemoveFromQuery(
      "issale",
      router.query,
      searchConf.filter.isSale
    );

    router.query = this.addOrRemoveFromQuery(
      "available",
      router.query,
      searchConf.filter.justAvailable
    );

    router.query = this.addOrRemoveFromQuery(
      "unbleivable",
      router.query,
      searchConf.filter.unbleivable
    );
    var ChooseTrueBrands: string[] = [];
    for (let i = 0; i < searchConf.filter.availableBrands.length; i++) {}
    searchConf.filter.availableBrands.map((brand) => {
      if (searchConf.filter.brands.includes(brand)) {
        ChooseTrueBrands.push(brand);
      }
    });
    console.log(
      "ChooseTrueBrands",
      ChooseTrueBrands,
      searchConf.filter.availableBrands
    );
    router.query["brands"] = ChooseTrueBrands;
    router.query["category"] = searchConf.filter.category;

    router.query["page"] = "1";
    const queryString: string = await this.convertObjectToParam(router?.query);
    router.push(`${router.pathname}${queryString}`);

    // var obj = filterEnableItems;
    // obj = {
    //   ...filterEnableItems,
    //   priceRange: { name: "قیمت" },
    // };
    // setFilterEnableItems(obj);
  }
  ToggleUnbleivable(search: SearchType): SearchType {
    if (search?.filter?.unbleivable) {
      search = {
        ...search,
        filter: {
          ...search.filter,
          unbleivable: false,
        },
      };
    } else {
      search = {
        ...search,
        filter: {
          ...search.filter,
          unbleivable: true,
        },
      };
    }
    return search;
  }
  ToggleIsSale(search: SearchType): SearchType {
    if (search?.filter?.isSale) {
      search = {
        ...search,
        filter: {
          ...search.filter,
          isSale: false,
        },
      };
    } else {
      search = {
        ...search,
        filter: {
          ...search.filter,
          isSale: true,
        },
      };
    }
    return search;
  }
  ToggleAvailable(search: SearchType): SearchType {
    if (search?.filter?.justAvailable === true) {
      search = {
        ...search,
        filter: {
          ...search.filter,
          justAvailable: false,
        },
      };
    } else {
      search = {
        ...search,
        filter: {
          ...search.filter,
          justAvailable: true,
        },
      };
    }
    return search;
  }
  // greet() {
  //   return "Hello, " + this.greeting;
  // }
  addToBrands(search: SearchType, brand: string): SearchType {
    if (search?.filter?.brands?.findIndex((item) => item === brand) < 0)
      search = {
        ...search,
        filter: {
          ...search.filter,
          brands: [...search.filter.brands, brand],
        },
      };

    return search;
  }

  removeFromBrands(search: SearchType, brand: string): SearchType {
    if (search?.filter?.brands?.findIndex((item) => item === brand) >= 0) {
      const arr = search.filter.brands.filter((item) => item !== brand);
      search = {
        ...search,
        filter: {
          ...search.filter,
          brands: [...arr],
        },
      };
    }

    return search;
  }
  addToCatL1(search: SearchType, catL1: string): SearchType {
    if (search?.filter?.category?.findIndex((item) => item === catL1) < 0)
      search = {
        ...search,
        filter: {
          ...search.filter,
          category: [...search.filter.category, catL1],
        },
      };

    return search;
  }

  removeFromCatL1(search: SearchType, catL1: string): SearchType {
    if (search?.filter?.category?.findIndex((item) => item === catL1) >= 0) {
      const arr = search.filter.category.filter((item) => item !== catL1);
      search = {
        ...search,
        filter: {
          ...search.filter,
          category: [...arr],
        },
      };
    }
    return search;
  }
}

//   let greeter = new Greeter("world");
