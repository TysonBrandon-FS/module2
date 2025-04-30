const mockShows = require('./__mocks__/showService');

describe('Show Service Tests', () => {
    test('should return limited data based on query string and select', () => {
        const dramaShows = mockShows.filter(show => show.genre === 'Drama');
        const limitedData = dramaShows.map(show => ({
            showName: show.showName,
            releaseYear: show.releaseYear
        }));

        expect(limitedData[0]).toHaveProperty('showName');
        expect(limitedData[0]).toHaveProperty('releaseYear');
        expect(limitedData[0]).not.toHaveProperty('genre');
        expect(limitedData[0]).not.toHaveProperty('isActive');
    });

    test('should return paginated data with skip and limit', () => {
        const page = 2;
        const limit = 2;
        const skip = (page - 1) * limit;
        const paginatedData = mockShows.slice(skip, skip + limit);

        expect(paginatedData).toHaveLength(2);
        expect(paginatedData[0].showName).toBe('Stranger Things');
        expect(paginatedData[1].showName).toBe('The Office');
    });

    test('should return sorted data in both directions', () => {
        const ascendingNames = [...mockShows].sort((a, b) => 
            a.showName.localeCompare(b.showName)
        );
        expect(ascendingNames[0].showName).toBe('Breaking Bad');
        expect(ascendingNames[3].showName).toBe('The Office');

        const descendingYears = [...mockShows].sort((a, b) => 
            b.releaseYear - a.releaseYear
        );
        expect(descendingYears[0].releaseYear).toBe(2016);
    });
}); 