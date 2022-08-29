interface Collection {
    address: string;
    name: string;
    description: string;
    coverIPFSHash: string;
    mysteryBoxInUSD: number;
    NFTPriceInUSD: number;
    presaleEndDate: string;
    capMysteryBox: number;
    capNFT: number;
    // availableMysteryBoxesQuantity: number;
    availableNftsQuantity: number;
}

export {
    Collection
}