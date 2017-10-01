// Enter your git repo url
def gitUrl = "https://github.com/nodecourse98/ShabetzNa-Server"
// Enter the name of your project
def ProjectNmae = "ShabetzNa-Server"
// Enter a name for your job. Should look like = unit-testing-projectname
def JobName = "unit-testing-ShabetzNa-Server"

job(JobName) {
    scm {
        git(gitUrl)
    }
    triggers {
        scm('*/5 * * * *')
    }
    steps {
        shell('npm install')
        shell('npm test')
    }
}

listView('test1') {
    description('Jobs')
    filterBuildQueue()
    filterExecutors()
    jobs {
        name('unit-testing-test')
//        regex(/project-A-.+/)
    }
    jobFilters {
        status {
            status(Status.UNSTABLE)
        }
    }
    columns {
        status()
        weather()
        name()
        lastSuccess()
        lastFailure()
        lastDuration()
        buildButton()
    }
}
