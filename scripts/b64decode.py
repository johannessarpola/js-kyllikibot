import base64
import argparse

parser = argparse.ArgumentParser(description='B64 Encode file')
parser.add_argument('--input', help='input file')
parser.add_argument('--output', help='output file')
args = parser.parse_args()

with open(args.input, 'r') as i:
    text = i.read()
    
decoded = base64.b64decode(bytes(text, 'utf-8'))

with open(args.output, 'wb') as o:
    o.write(decoded)

i.close()
o.close()

print("Wrote the decoded file: "+args.output)
# data = base64.b64decode(encoded)