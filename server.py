import cherrypy
import os

class Server:
    pass

cherrypy.quickstart(Server(), '', 'server.conf')
