
from datetime import datetime
import uuid
import pandas as pd
import psycopg2
import random

# Replace these values with your database information
db_config = {
    'host': 'localhost',
    'port': '5432',
    'user': 'mobylab-app',
    'password': 'mobylab-app',
    'database': 'mobylab-app',
}

# Connect to the PostgreSQL database
connection = psycopg2.connect(**db_config)

# Create a cursor object to interact with the database
cursor = connection.cursor()

query = """
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public';
"""

# Execute the query
cursor.execute(query)

# Fetch all rows
tables = cursor.fetchall()

# Display the list of tables
for table in tables:
    print(table[0])

# Example: Reading data from a table
table_name = '"Movie"'

# Replace 'column1, column2' with the columns you want to retrieve
columns_to_select = 'Movie.Id, Movie.Name'

# Construct the SELECT query
select_query = """
    SELECT "Id", "Name"
    FROM "Movie";
"""

# Execute the query
cursor.execute(select_query)

# Fetch all rows
rows = cursor.fetchall()

# Display the results
for row in rows:
    print(row)

# Don't forget to close the cursor and connection when done
cursor.close()
connection.close()

# Replace 'your_file.csv' with the actual path to your CSV file
csv_file_path = 'movies.csv'

# Read the CSV file into a DataFrame
df = pd.read_csv(csv_file_path)


selected_columns = ['Id', 'Title', 'Released', 'Genre', 'Language', 'Ratings.Value', 'Plot', 'Runtime']  # Replace with your actual column names
df = df[selected_columns]

column_mapping = {'Title': 'Name', 'Plot': 'Description', 'Released': 'ReleaseDate', 'Ratings.Value': 'Rating', 'Runtime': 'Duration'}
df.rename(columns=column_mapping, inplace=True)


df['Id'] = [str(uuid.uuid4()) for _ in range(len(df.index))]
df['Rating'] = df['Rating'].apply(lambda x: float(x.split('/')[0]))
df['CreatedAt'] = datetime.today()
df['UpdatedAt'] = datetime.today()
df['NumberOfRatings'] = random.randint(100, 5000)
df['Language'] = df['Language'].str.slice(0, 50)


print(df)

data_tuples = [tuple(row) for row in df.itertuples(index=False, name=None)]

connection = psycopg2.connect(**db_config)

cursor = connection.cursor()

# Specify the table name
table_name = 'your_table_name'

# Define the SQL query for data insertion
columns = '", "'.join(df.columns)
columns = "\"" + columns + "\""
placeholders = ', '.join(['%s'] * len(df.columns))
print(placeholders)
insert_query = f"INSERT INTO  \"Movie\" ({columns}) VALUES ({placeholders});"
# insert_query = f"INSERT INTO \"Movie\" ({', '.join(df.columns)}) VALUES %s;"

# Execute the query
cursor.executemany(insert_query, data_tuples)

# Commit the changes
connection.commit()

# Close the cursor and connection
cursor.close()
connection.close()