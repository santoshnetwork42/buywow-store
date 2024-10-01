// ==================================================
// NEW APIs

export const getInitialData = /* GraphQL */ `
  query getInitialData(
    $ltoProductFilter: SearchableUpsellProductFilterInput
    $ltoProductSort: [SearchableUpsellProductSortInput]
    $ltoProductLimit: Int
    $ltoProductNextToken: String
    $ltoProductFrom: Int
    $ltoProductAggregates: [SearchableUpsellProductAggregationInput]
    $getStoreSettingInput: GetStoreSettingInput!
    $storeId: ID!
    $deviceType: DeviceType!
    $couponNextToken: String
    $ruleEngineLimit: Int
    $ruleEngineNextToken: String
    $shippingTierFilter: SearchableShippingTierFilterInput!
  ) {
    getStoreSetting(input: $getStoreSettingInput) {
      id
      configurations {
        ORDER_COUNT
        COD_CHARGES
        PREPAID_DISCOUNT_PERCENT
        MAX_COD_AMOUNT
        MAX_PREPAID_DISCOUNT
        GUEST_CHECKOUT
        COD_ENABLED
        PREPAID_ENABLED
        TIMER_TTILE
        TIMER_DESCRIPTION
        TIMER_COLOR
        TIMER_BG_COLOR
        TIMER_END_TIME
        TIMER_START_TIME
        IS_DAILY_TIMER
        TIMER_ENABLED
        BLOCK_INVENTORY
        GOKWIK_ENABLED
        PPCOD_ENABLED
        PPCOD_AMOUNT
        SHOW_SHIPPING_BAR
      }
    }

    getStore(id: $storeId, deviceType: $deviceType) {
      id
      name
      title
      description
      isActive
      webUrl
      trackingUrl
      imageUrl
      darkImageUrl
    }

    searchShippingTiers(filter: $shippingTierFilter) {
      items {
        id
        storeId
        paymentType
        amount
        minOrderValue
        maxOrderValue
        createdAt
        updatedAt
        __typename
      }
    }

    listVariantGroups(storeId: $storeId) {
      id
      label
      variantOptions {
        id
        label
      }
    }

    getTopCoupons(
      storeId: $storeId
      deviceType: $deviceType
      nextToken: $couponNextToken
    ) {
      items {
        id
        description
        couponNote
        tAndC
        couponTitle
        code
        priority
        couponType
        buyXQuantity
        getYAmount
        getYPercentage
        getYQuantity
        getYProduct
        getYStoreProduct {
          id
          title
          price
          listingPrice
          sku
          subCategory {
            name
            slug
          }
          category {
            name
            slug
          }
          images {
            items {
              id
              imageKey
              alt
            }
          }
        }
        minOrderValue
        maxDiscount
        expirationDate
        autoApply
        applicableCollections
        applicableProducts
        paymentMethod
        isAffiliated
        applyPrepaidDiscount
        applyOnAllVariants
        isPDPFeatured
        isFeatured
      }
    }

    byStoreIdRuleEngine(
      storeId: $storeId
      limit: $ruleEngineLimit
      nextToken: $ruleEngineNextToken
    ) {
      items {
        id
        storeId
        name
        description
        event
        enabled
        type
        minOrderValue
        maxCashbackAllowed
        cashbackPercentage
        expirePeriodInDays
        cashbackPoint
        couponName
        maxDebitableCashbackPerMonth
        maxCreditableCashbackPerMonth
        conditions {
          event
          attributes {
            key
            operator
            value
          }
        }
        createdAt
        updatedAt
      }
      nextToken
    }

    searchUpsellProducts(
      filter: $ltoProductFilter
      sort: $ltoProductSort
      limit: $ltoProductLimit
      nextToken: $ltoProductNextToken
      from: $ltoProductFrom
      aggregates: $ltoProductAggregates
    ) {
      items {
        id
        storeId
        slug
        sku
        flatPrice
        minOrderValue
        link
        minimumOrderQuantity
        maximumOrderQuantity
        priority
        isArchive
        autoApply
        variantId
        productId
        product {
          id
          minimumOrderQuantity
          maximumOrderQuantity
          title
          collections
          vendor
          status
          isFeatured
          defaultPrice
          defaultInventory
          benefits
          slug
          price
          sku
          position
          collectionsList {
            label
            priority
          }
          listingPrice
          tags
          inventory
          blockedInventory
          subCategoryId
          defaultPrice
          defaultInventory
          variantGroups {
            variantGroupId
            variantGroupOptionIds
          }
          continueSellingOutOfStock
          rating
          totalRatings
          thumbImages
          isInventoryEnabled
          totalOrders
          variants {
            items {
              id
              minimumOrderQuantity
              maximumOrderQuantity
              title
              price
              position
              listingPrice
              productVariantOptionIds {
                variantGroupId
                variantGroupOptionId
              }
              images {
                items {
                  id
                  productId
                  position
                  createdAt
                  updatedAt
                  alt
                  width
                  height
                  imageKey
                  isThumb
                }
              }
              inventory
              blockedInventory
              status
            }
          }
          images {
            items {
              id
              position
              alt
              width
              height
              imageKey
              isThumb
            }
          }
        }
      }
      nextToken
      total
    }
  }
`;

export const getCMSPages = /* GraphQL */ `
  query getCMSPages($storeId: String!, $type: CMSPageType!) {
    getCMSPages(storeId: $storeId, type: $type)
  }
`;

export const searchWebCMSCollectionProducts = /* GraphQL */ `
  query searchWebCMSCollectionProducts(
    $storeId: String!
    $collectionSlug: String!
    $tabSelected: String
    $defaultSorting: DefaultSorting
    $page: Int
    $limit: Int
  ) {
    searchWebCMSCollectionProducts(
      storeId: $storeId
      collectionSlug: $collectionSlug
      tabSelected: $tabSelected
      defaultSorting: $defaultSorting
      page: $page
      limit: $limit
    )
  }
`;

export const getWebPageBySlug = /* GraphQL */ `
  query GetPageBySlug(
    $pageType: String!
    $slug: String!
    $storeId: String!
    $collectionDataLimit: Int
  ) {
    getWebPageBySlug(
      pageType: $pageType
      slug: $slug
      storeId: $storeId
      collectionDataLimit: $collectionDataLimit
    )
  }
`;

export const getPageMetadataBySlug = /* GraphQL */ `
  query GetPageMetadataBySlug($slug: String!, $storeId: String!) {
    getPageMetadataBySlug(slug: $slug, storeId: $storeId)
  }
`;

export const getWebNavbarAndFooter = /* GraphQL */ `
  query GetNavbarAndFooter($storeId: String!) {
    getWebNavbarAndFooter(storeId: $storeId)
  }
`;

export const getUser = /* GraphQL */ `
  query GetUser {
    getUser {
      id
      owner
      firstName
      lastName
      email
      phone
      gender
      dob
      totalOrders
      isActive
      authProvider
      isAdmin
      profilePhotoUrl
      emailVerified
      phoneVerified
      isCognitoConfirmed
      createdAt
      updatedAt
      totalOrders
    }
  }
`;
// NEW APIs
// ==================================================

// ==================================================
// OLD APIs

export const applyCoupon = /* GraphQL */ `
  mutation ApplyCoupon(
    $storeId: ID!
    $code: String!
    $deviceType: ApplCouponDeviceType!
    $variantFilter: ModelVariantFilterInput
    $variantLimit: Int
    $imageLimit: Int
  ) {
    applyCoupon(storeId: $storeId, code: $code, deviceType: $deviceType) {
      id
      code
      couponType
      buyXQuantity
      getYAmount
      getYPercentage
      getYQuantity
      getYProduct
      couponTitle
      description
      getYStoreProduct {
        id
        title
        collections
        vendor
        subCategory {
          name
          slug
        }
        isFeatured
        category {
          name
          slug
        }
        slug
        price
        sku
        position
        listingPrice
        tags
        inventory
        blockedInventory
        continueSellingOutOfStock
        rating
        totalRatings
        thumbImages
        isInventoryEnabled
        totalOrders
        variants(filter: $variantFilter, limit: $variantLimit) {
          items {
            id
            title
            price
            position
            listingPrice
            images {
              items {
                id
                productId
                position
                createdAt
                updatedAt
                alt
                width
                height
                imageKey
                isThumb
              }
            }
            inventory
            blockedInventory
          }
        }
        images(limit: $imageLimit) {
          items {
            id
            position
            alt
            width
            height
            imageKey
            isThumb
          }
        }
      }
      minOrderValue
      maxDiscount
      applicableCollections
      applicableProducts
      paymentMethod
      applyPrepaidDiscount
    }
  }
`;

export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      code
      storeId
      userId
      channelName
      shippingAddress {
        name
        country
        state
        city
        pinCode
        landmark
        address
        location
        area
      }
      appliedRewardPoints
      billingAddress {
        name
        country
        state
        city
        pinCode
        landmark
        address
        location
        area
      }
      totalStoreCredit
      couponCodeId
      totalAmount
      totalCashOnDeliveryCharges
      totalDiscount
      totalGiftCharges
      totalPrepaidAmount
      totalShippingCharges
      taxExempted
      cFormProvided
      thirdPartyShipping
      totalCashbackRefunded
      cashbackEarned
      currency
      prepaidDiscount
      paymentType
      sla
      priority
      orderDate
      status
      source
      checkoutChannel
      products {
        items {
          id
          productId
          product {
            id
            title
            slug
            productDescription
            price
            sku
            status
            costPrice
            listingPrice
            totalOrders
            images {
              items {
                id
                alt
                width
                height
                imageKey
                isThumb
              }
            }
          }
          variantId
          variant {
            id
            productId
            title
            price
            status
            costPrice
            listingPrice
            images {
              items {
                id
                alt
                width
                height
                imageKey
                isThumb
              }
            }
          }
          sku
          cancelledQuantity
          quantity
          price
          status
          deliveryPartner
          shippingCourier
          trackingId
        }
      }
      payments {
        items {
          id
          orderId
          method
          status
          amount
          createdAt
          updatedAt
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export const getProductById = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      minimumOrderQuantity
      maximumOrderQuantity
      title
      collections
      vendor
      subCategory {
        name
        slug
      }
      isFeatured
      category {
        name
        slug
      }
      slug
      price
      sku
      position
      listingPrice
      tags
      inventory
      blockedInventory
      continueSellingOutOfStock
      rating
      totalRatings
      thumbImages
      isInventoryEnabled
      totalOrders
      variantGroups {
        variantGroupId
        variantGroupOptionIds
      }
      variants {
        items {
          id
          minimumOrderQuantity
          maximumOrderQuantity
          title
          price
          position
          listingPrice
          productVariantOptionIds {
            variantGroupId
            variantGroupOptionId
          }
          images {
            items {
              id
              position
              alt
              width
              height
              imageKey
              isThumb
            }
          }
          inventory
          blockedInventory
        }
      }
      images {
        items {
          id
          position
          alt
          width
          height
          imageKey
          isThumb
        }
      }
    }
  }
`;

export const createReview = /* GraphQL */ `
  mutation CreateReview($input: CreateReviewInput!) {
    createReview(input: $input) {
      id
      userId
      verified
      reviewer {
        name
        email
      }
      productId
      rating
      comment
      title
      images
      createdAt
    }
  }
`;

export const updateReview = /* GraphQL */ `
  mutation UpdateReview($input: UpdateReviewInput!) {
    updateReview(input: $input) {
      id
      userId
      verified
      reviewer {
        name
        email
      }
      productId
      rating
      comment
      title
      images
      createdAt
    }
  }
`;

export const createShoppingCart = /* GraphQL */ `
  mutation CreateShoppingCart($input: CreateShoppingCartInput!) {
    createShoppingCart(input: $input) {
      success
      message
      shoppingCartId
    }
  }
`;

export const findUserAddresses = /* GraphQL */ `
  query SearchUserAddresses(
    $filter: SearchableUserAddressFilterInput
    $sort: [SearchableUserAddressSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableUserAddressAggregationInput]
  ) {
    searchUserAddresses(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        userID
        name
        phone
        email
        country
        state
        city
        pinCode
        landmark
        address
        location
        area
        createdAt
        updatedAt
      }
      total
    }
  }
`;

export const createUserAddress = /* GraphQL */ `
  mutation CreateUserAddress($input: CreateUserAddressInput!) {
    createUserAddress(input: $input) {
      id
      userID
      name
      phone
      email
      country
      state
      city
      pinCode
      landmark
      address
      location
      area
      createdAt
      updatedAt
    }
  }
`;

export const updateUserAddress = /* GraphQL */ `
  mutation UpdateUserAddress($input: UpdateUserAddressInput!) {
    updateUserAddress(input: $input) {
      id
      userID
      name
      phone
      email
      country
      state
      city
      pinCode
      landmark
      address
      location
      area
      createdAt
      updatedAt
    }
  }
`;

export const deleteUserAddress = /* GraphQL */ `
  mutation DeleteUserAddress($input: DeleteUserAddressInput!) {
    deleteUserAddress(input: $input) {
      id
      userID
      name
      phone
      email
      country
      state
      city
      pinCode
      landmark
      address
      location
      area
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const searchOrders = /* GraphQL */ `
  query SearchOrders(
    $filter: SearchableOrderFilterInput
    $sort: [SearchableOrderSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableOrderAggregationInput]
  ) {
    searchOrders(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        code
        totalAmount
        orderDate
        status
        createdAt
      }
      nextToken
      total
    }
  }
`;

export const updateUser = /* GraphQL */ `
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      owner
      firstName
      lastName
      email
      phone
      gender
      dob
      isActive
      authProvider
      isAdmin
      profilePhotoUrl
      emailVerified
      phoneVerified
      isCognitoConfirmed
      createdAt
      updatedAt
    }
  }
`;

export const getStore = /* GraphQL */ `
  query GetStore($id: ID!, $deviceType: DeviceType!) {
    getStore(id: $id, deviceType: $deviceType) {
      id
      name
      title
      description
      isActive
      webUrl
      imageUrl
      darkImageUrl
      banners {
        webKey
        mobileKey
        link
        name
        isArchive
        priority
      }
      announcements {
        label
        link
        color
        textColor
        isArchive
      }
      socialLinks {
        instagram
        facebook
        twitter
        youtube
        pinterest
      }
      createdAt
      updatedAt
    }
  }
`;

export const validateTransaction = /* GraphQL */ `
  mutation ValidateTransaction($orderId: ID!, $razorpayPaymentId: String!) {
    validateTransaction(
      orderId: $orderId
      razorpayPaymentId: $razorpayPaymentId
    ) {
      success
    }
  }
`;

export const getZipCode = /* GraphQL */ `
  query GetZipCode($id: ID!) {
    getZipCode(id: $id) {
      id
      codMaxAmount
      cod
      prepaid
      createdAt
      updatedAt
    }
  }
`;

export const getReviews = /* GraphQL */ `
  query SearchReviews(
    $filter: SearchableReviewFilterInput
    $sort: [SearchableReviewSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableReviewAggregationInput]
  ) {
    searchReviews(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        userId
        verified
        reviewer {
          name
          email
        }
        productId
        rating
        comment
        title
        images
        createdAt
      }
      nextToken
      total
    }
  }
`;

export const getReviewsAnalytics = /* GraphQL */ `
  query SearchReviews(
    $filter: SearchableReviewFilterInput
    $sort: [SearchableReviewSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableReviewAggregationInput]
  ) {
    searchReviews(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;

export const getLoyalty = /* GraphQL */ `
  query GetLoyalty($input: GetLoyaltyInput!) {
    getLoyalty(input: $input) {
      totalAllotted
      totalUsable
      totalUsed
      totalExpired
      transactions {
        id
        amount
        userId
        expiresAt
        expirePeriodInDays
        event
        ruleId
        status
        transactionState
        createdAt
        updatedAt
        metadata
        reason
      }
    }
  }
`;

export const getRedirects = /* GraphQL */ `
  query GetRedirects($slug: String!, $storeId: ID!) {
    getRedirects(slug: $slug, storeId: $storeId) {
      slug
      redirect
      hitCount
    }
  }
`;

export const createRedirects = /* GraphQL */ `
  mutation CreateRedirects($input: CreateRedirectsInput!) {
    createRedirects(input: $input) {
      id
    }
  }
`;

export const updateRedirects = /* GraphQL */ `
  mutation UpdateRedirects($input: UpdateRedirectsInput!) {
    updateRedirects(input: $input) {
      id
      storeId
      slug
      hitCount
      redirect
      updatedAt
    }
  }
`;

export const getCouponRule = /* GraphQL */ `
  query GetCouponRule($code: ID!, $storeId: ID!) {
    getCouponRule(code: $code, storeId: $storeId) {
      id
      code
      storeId
      prefix
      userId
      name
      description
      couponType
      deviceType
      expirationDate
      couponCodeCount
      getYStoreProduct {
        id
        title
        brand
        vendor
        collections
        categoryId
        subCategoryId
        storeId
        bulkActionId
        isFeatured
        productType
        createdAt
        slug
        pageTitle
        productDescription
        longDescription
        manufacturer
        updatedAt
        isPublished
        publishedAt
        price
        sku
        size
        color
        status
        position
        currency
        costPrice
        listingPrice
        taxable
        barcode
        tags
        benefits
        weight
        weightUnit
        minimumOrderQuantity
        inventory
        blockedInventory
        continueSellingOutOfStock
        rating
        totalRatings
        totalOrders
        thumbImages
        isTaxEnabled
        isInventoryEnabled
        googleCategory
        hasVarient
        hasFaq
        recommended
        recommendPriority
        recommendPrice
      }
      buyXQuantity
      getYAmount
      getYPercentage
      getYQuantity
      getYProduct
      minOrderValue
      maxDiscount
      maxAllowedUsage
      applicableCollections
      applicableProducts
      paymentMethod
      isArchive
      isFeatured
      isBulkCoupon
      autoApply
      isAffiliated
      createdAt
      updatedAt
    }
  }
`;

export const manageShoppingCart = /* GraphQL */ `
  mutation ManageShoppingCart($input: ManageShoppingCartInput!) {
    manageShoppingCart(input: $input) {
      success
      message
      shoppingCartId
    }
  }
`;

export const getFeaturedBlogs = /* GraphQL */ `
  query FeatueredBlogs($first: Int) {
    posts(first: $first, where: { tagSlugIn: "english", status: PUBLISH }) {
      nodes {
        date
        id
        databaseId
        slug
        status
        title
        uri
        excerpt
        toPing
        link
        author {
          node {
            name
            slug
            avatar {
              url
              height
              width
            }
            username
            nicename
          }
        }
        seo {
          readingTime
        }
        featuredImage {
          node {
            mediaItemUrl
          }
        }
      }
    }
  }
`;

export const getCategories = /* GraphQL */ `
  query GetCategories {
    categories {
      nodes {
        id
        databaseId
        slug
        name
      }
    }
  }
`;

export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    category(id: $id, idType: SLUG) {
      id
      databaseId
      slug
      name
    }
  }
`;

export const getTags = /* GraphQL */ `
  query GetTags {
    tags {
      nodes {
        id
        databaseId
        slug
        name
      }
    }
  }
`;

export const getTag = `
query GetTag($id: ID!) {
  tag(id: $id, idType: SLUG) {
    id
    databaseId
    slug
    name
  }
}
`;

export const getAllBlogSlugs = /* GraphQL */ `
  query GetBlogs(
    $category: String
    $author: String
    $tags: [String]
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    posts(
      where: {
        categoryName: $category
        tagSlugIn: $tags
        authorName: $author
        status: PUBLISH
      }
      first: $first
      last: $last
      after: $after
      before: $before
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          slug
        }
      }
    }
  }
`;

export const getBlogs = /* GraphQL */ `
  query GetBlogs(
    $category: String
    $author: String
    $tags: [String]
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    posts(
      where: {
        categoryName: $category
        tagSlugIn: $tags
        authorName: $author
        status: PUBLISH
      }
      first: $first
      last: $last
      after: $after
      before: $before
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          id
          databaseId
          slug
          seo {
            readingTime
          }
          title
          uri
          excerpt
          link
          date
          featuredImage {
            node {
              mediaItemUrl
            }
          }
          author {
            node {
              name
              slug
              avatar {
                url
                height
                width
              }
              seo {
                social {
                  facebook
                  instagram
                  mySpace
                  linkedIn
                  pinterest
                  soundCloud
                  twitter
                  wikipedia
                  youTube
                }
              }
              username
              nicename
            }
          }
        }
      }
    }
  }
`;

export const getBlogsForSitemap = /* GraphQL */ `
  query GetBlogs($first: Int, $last: Int, $after: String, $before: String) {
    posts(
      where: { status: PUBLISH }
      first: $first
      last: $last
      after: $after
      before: $before
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          id
          databaseId
          slug
          title
          uri
          link
          date
        }
      }
    }
  }
`;

export const getBlog = /* GraphQL */ `
  query GetBlogBySlug($id: ID!, $idType: PostIdType!) {
    post(id: $id, idType: $idType) {
      id
      databaseId
      slug
      title
      uri
      excerpt
      link
      date
      seo {
        metaDesc
        readingTime
      }
      featuredImage {
        node {
          mediaItemUrl
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      tags {
        nodes {
          name
          slug
        }
      }
      content
      author {
        node {
          name
          slug
          description
          avatar {
            url
          }
          seo {
            social {
              linkedIn
            }
          }
        }
      }
    }
  }
`;

export const getAuthors = /* GraphQL */ `
  query GetAuthors {
    users {
      nodes {
        slug
        databaseId
        nicename
        name
      }
    }
  }
`;

export const getAuthor = /* GraphQL */ `
  query Author($id: ID!, $idType: UserNodeIdTypeEnum!) {
    user(id: $id, idType: $idType) {
      nicename
      email
      databaseId
      description
      firstName
      lastName
      name
      nickname
      slug
      username
      url
      uri
      avatar {
        url
        height
        width
      }
      seo {
        social {
          facebook
          instagram
          linkedIn
          mySpace
          pinterest
          soundCloud
          twitter
          wikipedia
          youTube
        }
        title
        canonical
      }
    }
  }
`;

export const getTopMenu = /* GraphQL */ `
  query GetMenu($id: ID!) {
    menu(id: $id, idType: ID) {
      id
      menuItems {
        nodes {
          id
          label
          path
        }
      }
    }
  }
`;

export const ensureUserAndDispatchOTP = /* GraphQL */ `
  query EnsureUserAndDispatchOTP($storeId: ID!, $phone: AWSPhone!) {
    ensureUserAndDispatchOTP(storeId: $storeId, phone: $phone) {
      isExistingUser
    }
  }
`;

export const verifyCustomOTP = /* GraphQL */ `
  query VerifyCustomOTP($storeId: ID!, $phone: AWSPhone!, $otp: String!) {
    verifyCustomOTP(storeId: $storeId, phone: $phone, otp: $otp) {
      isVerified
    }
  }
`;

export const getUserRewards = /* GraphQL */ `
  query GetUser($storeId: ID) {
    getUser(storeId: $storeId) {
      id
      totalRewards
    }
  }
`;

// OLD APIs
// ==================================================
