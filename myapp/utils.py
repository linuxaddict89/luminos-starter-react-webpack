from luminos.utils import utils

# def cleanArgs(argv: list):
    # return list(filter(lambda arg: , argv))

def getArgsParser():
    luminos_parser = utils.get_argparser()

    luminos_parser.prog = "runcy"
    luminos_parser.description = ""

    return luminos_parser

