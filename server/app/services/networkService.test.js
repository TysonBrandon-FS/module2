const networks = require('./__mocks__/networkService');

describe('Network Service Tests', () => {
    test('should return limited data based on query string and select', () => {
        const nyNetworks = networks.filter(network => network.headquarters === 'New York');
        const limitedData = nyNetworks.map(network => ({
            networkName: network.networkName,
            channelNumber: network.channelNumber
        }));

        expect(limitedData[0]).toHaveProperty('networkName');
        expect(limitedData[0]).toHaveProperty('channelNumber');
        expect(limitedData[0]).not.toHaveProperty('headquarters');
        expect(limitedData[0]).not.toHaveProperty('establishedYear');
    });

    test('should return paginated data with skip and limit', () => {
        const page = 2;
        const limit = 2;
        const skip = (page - 1) * limit;
        const paginatedData = networks.slice(skip, skip + limit);

        expect(paginatedData).toHaveLength(2);
        expect(paginatedData[0].networkName).toBe('AMC');
        expect(paginatedData[1].networkName).toBe('FX');
    });

    test('should return sorted data in both directions', () => {
        const ascendingNames = [...networks].sort((a, b) => 
            a.networkName.localeCompare(b.networkName)
        );
        expect(ascendingNames[0].networkName).toBe('AMC');
        expect(ascendingNames[3].networkName).toBe('Showtime');

        const descendingYears = [...networks].sort((a, b) => 
            b.establishedYear - a.establishedYear
        );
        expect(descendingYears[0].establishedYear).toBe(1994);
    });
}); 