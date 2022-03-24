import csv
import sys
input = '/Users/matthewescobar/Downloads/ol_dump_authors_2022-03-02.txt'
output = 'ol_dump_authors_2022-03-02_processed.csv'
csv.field_size_limit(sys.maxsize)
with open(output, 'w', newline='') as csvoutputfile:
    csvwriter = csv.writer(csvoutputfile, delimiter='\t', quotechar='|', quoting=csv.QUOTE_MINIMAL)
    with open(input, 'r') as csvinputfile:
        csvreader = csv.reader(csvinputfile, delimiter='\t')
        for row in csvreader:
            if len(row) > 4:
                csvwriter.writerow([row[0], row[1], row[2], row[3], row[4]])
    print('Finished reading')
print('Finished writing')