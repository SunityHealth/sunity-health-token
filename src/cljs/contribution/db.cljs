(ns contribution.db
  (:require
    [cljs-time.core :as t]
    [cljs-web3.core :as web3]
    [cljs.spec.alpha :as s]
    [district0x.db]
    [district0x.utils :as u]
    [re-frame.core :refer [dispatch]]))

(s/def :contribution/stopped? boolean?)
(s/def :contribution/founder1 (s/nilable u/address?))
(s/def :contribution/wallet (s/nilable u/address?))
(s/def :contribution/team (s/coll-of u/address?))
(s/def :contribution/max-gas-price u/non-neg?)
(s/def :dnt-token/transfers-enabled? boolean?)

(s/def :contrib-period/soft-cap-amount u/not-neg?)
(s/def :contrib-period/after-soft-cap-duration u/not-neg?)
(s/def :contrib-period/hard-cap-amount u/not-neg?)
(s/def :contrib-period/start-time (s/nilable u/date?))
(s/def :contrib-period/end-time (s/nilable u/date?))
(s/def :contrib-period/enabled? boolean?)
(s/def :contrib-period/cancelled? boolean?)
(s/def :contrib-period/soft-cap-reached? boolean?)
(s/def :contrib-period/hard-cap-reached? boolean?)
(s/def :contrib-period/total-contributed u/not-neg?)
(s/def :contrib-period/contributors-count u/not-neg?)
(s/def :contrib-period/stake u/not-neg?)
(s/def :contrib-period/loading? boolean?)

(s/def :contribution/contrib-period (s/keys :opt [:contrib-period/soft-cap-amount
                                                  :contrib-period/after-soft-cap-duration
                                                  :contrib-period/hard-cap-amount
                                                  :contrib-period/start-time
                                                  :contrib-period/end-time
                                                  :contrib-period/enabled?
                                                  :contrib-period/cancelled?
                                                  :contrib-period/soft-cap-reached?
                                                  :contrib-period/hard-cap-reached?
                                                  :contrib-period/total-contributed
                                                  :contrib-period/contributors-count
                                                  :contrib-period/stake
                                                  :contrib-period/loading?]))

(s/def :form.contribution/contribute (s/map-of :district0x.db/only-default-kw :district0x.db/submit-form))
(s/def :form.contribution/enable-contrib-period (s/map-of :district0x.db/only-default-kw :district0x.db/submit-form))

(def default-db
  (merge
    district0x.db/default-db
    {:load-node-addresses? false
     :node-url "https://ropsten.infura.io/" #_"http://localhost:8549"
     :smart-contracts {:contribution {:name "SunityContribution" :address "0x7fe3feD298348dA1C6d1b911172f55A9434139C1"}
                       :dnt-token {:name "SunityHealthToken" :address "0x1876074A90A5d4c6701b50e822F783f44CdC7e75"}
                       :mini-me-token-factory {:name "MiniMeTokenFactory" :address "0xF940aCfd1e84eEEfdBbba4c2d597E0D31CE06472"}
                       :multisig-wallet {:name "MultisigWallet" :address "0x85D9D25967B215792585a72f85370344912E960B"}}
     :now (t/now)
     :admin-addresses #{"0x0A2694F2F88B2ECb397DD6E2c3aB2A2FFcB75aC3" "0xf00b8AFc7b67efEF9280daB0fb7CA00997F29371" "0x00f7E88f827C8947DfD7B083a72771156A215357"}
     :disallowed-country? false
     :confirmed-terms? false
     :confirmed-not-us-citizen? false
     :confirmed-gas-price? false
     :confirmed-compensation? false
     :confirmations-submitted? false
     :dnt-token/transfers-enabled? false
     :contribution/stopped? false
     :contribution/founder1 nil
     :contribution/wallet nil
     :contribution/team []
     :contribution/max-gas-price 0
     :contribution/contrib-period {}
     :form.contribution/contribute {:default {:loading? false
                                              :gas-limit 200000
                                              :data {:contribution/amount 1}
                                              :errors #{}}}

     :form.contribution/enable-contrib-period {:default {:loading? false
                                                         :gas-limit 100000
                                                         :data {:contribution/period-index 0}
                                                         :errors #{}}}}))