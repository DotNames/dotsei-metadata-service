import { ChainId } from "./chainIds";
const contracts = {
  domainRegistry: {
    97: "0x8D864BD8e25f0e05Df31e7Cbe7315D9CaD1D5693",
    [ChainId.MATIC_TESTNET]: "0x75034d20012f02975685a198387CdF6cDEA30745",
    [ChainId.MATIC]: "0x7579b38d0A7e761828Dc650AB627b36e9456B4b8",
    [ChainId.LIBERTY15]: "0x560dde815414953Acc097d9d29c10B46644bce02",
    [ChainId.LIBERTY20]: "0x8Cd65b20d3dD0Fac87083A07F8f9cf4cDCAB5074",
  },
  minterController: {
    97: "0xcDc923b7988CCf43f8b430fe6F289a4dFb885837",
    [ChainId.MATIC_TESTNET]: "0x6629Fe844f371a72eC57104B7e5a2cA2c69dBcF1",
    [ChainId.MATIC]: "0x287FF4965Be108dA739Bc397C2afE51e5Ae2AB27",
    [ChainId.LIBERTY15]: "0x118F74F1d1380E81e43cB168fb34A352782a2060",
    [ChainId.LIBERTY20]: "0x33889CE10A4D13FCD46FCD380B8eEB7a03CB69D6",
  },
  domainResolver: {
    97: "0x5dE28e474693BFe0923fD3DE8a271a54544D2236",
    [ChainId.MATIC_TESTNET]: "0x71e484f1d9E2963a9E5Db67D2948213d59e5AA11",
    [ChainId.MATIC]: "0xCF13be763E628Ed3C197638cE0F4070a7Fd9756C",
    [ChainId.LIBERTY15]: "0x03103Fa64916529a1148Cc86Af3375009A3E914a",
    [ChainId.LIBERTY20]: "0x623c0Be8B4f4907a3D65c8e9e0ccc1969ce321dD",
  },
  domainRegistrar: {
    97: "0x9c0abDec9b80F520beb712Aac58d011ea2eD99a5",
    [ChainId.MATIC_TESTNET]: "0x466c43E959C71dbe265a5d5bB27C52bf4044b3a1",
    [ChainId.MATIC]: "0x18325cEf908833dbfeaBe8160D8290a7Ca5Fe682",
    [ChainId.LIBERTY15]: "0x76460603380382279339B40B107530E152009273",
    [ChainId.LIBERTY20]: "0x70B263edAaD6E20e68830e84588CaC9607167D40",
  },
};

export const contractsV2 = {
  registry: "sei1vcap3eeztjle3qy8cl50e80qy9anpr8njkasa66g9dk34l0jtrls7huhv7",
  registrar: "sei1ywtz0ug9syuy9mg00ce93ake4j84f0y6lshc8cxdq2czuyav895qf0mmqy",
  resolver: "sei1a74yars3jdanxj2myukt9vfmrk65p2a88jj3axdl9g6pulhgf84sqqqjas",
  reverseRegistrar:
    "sei1cmmfxy0n97s87cfxxran2xkmfl3cmm3fq6wrj3vy8hpgxyn80d9q3d55kk",
  controller: "sei12p2mwewadmf46zmulydyuphdrsxlss6j924ef7wppylaa2g5eypsg403f3",
};
export const seiContracts = {
  registry: "sei1qzz96z3hg4jl5qz2ky6msqtdtslx4kqxn9uuwqk75hvtphncw5tstqhfpu",
  registrar: "sei142qep0fke20yvs9s7ufgmxrxg37zhe486udrpjzsnglaw03pcyrqtf0fnx",
  reverseRegistrar:
    "sei1vrm3fekj7m4mz4agxkr5hdxa958kwsgjj2vmflhalxeqw70usntsv58ldt",
  controller: "sei1mrw7gcd76nng8p554f2c00557txjtxhpmrmskfyn39gjcs4ewhlqnzqmmf",
  resolver: "sei17xd4qyfxwnzylewlr99927h7s48tu80mdm56y9eravpqvsmrml5srrmtty",
};

export default contracts;
