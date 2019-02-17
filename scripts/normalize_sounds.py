import glob, os, argparse
from pydub import AudioSegment

parser = argparse.ArgumentParser(description='Normalize sound files.')
parser.add_argument('directory', type=str,
                    help='directory of the sound files')
parser.add_argument('-a', '--ampl', default=-20, type=int,
                    help='Normalization amplitude for all files, defaults to -20')
parser.add_argument('-o', '--out', default="out", type=str,
                    help='Output directory')

def match_target_amplitude(file, extension, outdir, target_dBFS):
    name = file.rpartition('.')[0]
    sound = AudioSegment.from_file(file, extension)
    change_in_dBFS = target_dBFS - sound.dBFS
    normalized_sound = sound.apply_gain(change_in_dBFS)
    try: 
        os.makedirs(outdir)
    except:
        pass
    fn = os.path.join(outdir, f"{name}.{extension}")
    normalized_sound.export(fn, format=extension)


def for_all_files(dir, extension, action):
    """
    Reads files in directory based on extension
    """
    os.chdir(dir)
    for file in glob.glob(f"*.{extension}"):
        print(f"Processing file: {file}")
        action(file, extension)

if __name__ == "__main__":
    args = parser.parse_args()
    print(args)
    action =  lambda f,e: match_target_amplitude(f, e, args.out, args.ampl)
    for_all_files(args.directory, "mp3", action)
    pass
    
